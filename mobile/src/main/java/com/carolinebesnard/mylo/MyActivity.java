package com.carolinebesnard.mylo;

import android.app.Activity;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Environment;
import android.os.Vibrator;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.view.Gravity;

import android.util.Log;
import android.webkit.WebViewClient;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;

import android.content.Intent;
import android.net.Uri;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;


public class MyActivity extends Activity implements LocationUpdateListener{

    private static final int TWO_MINUTES = 1000 * 60 * 2;
    private int locationUpdateRequestResponse = 0;
    public static Location currentLoc=null;
    public WebView w;
    private boolean onCreate;
    private boolean webviewEndOfLoad=false;
    private LocationListener locationListener;
    public LocationManager locationManager;
    public static int appState;
    public static boolean updated;
    private LocationHandler myLocationObject;
    private static final String TAG = MyActivity.class.getSimpleName();
    private static final String PROPERTY_ID = "UA-51649868-2";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        updated = false;
        onCreate=false;
        /*Create Webview*/
        w = new WebView(this);
        w.getSettings().setJavaScriptEnabled(true);
        WebView.setWebContentsDebuggingEnabled(true);
        w.setWebViewClient(new WebViewClient() {

            public void onPageFinished(WebView view, String url) {
                webviewEndOfLoad=true;
                if(currentLoc!=null){
                    //Set Javascript user Position
                    w.loadUrl("javascript:setUserPosition("+currentLoc.getLatitude()+","+currentLoc.getLongitude()+")");
                }
                readDatas();
            }
        });
        w.loadUrl("file:///android_asset/www/index.html");
        w.addJavascriptInterface(new myJsInterface(this), "Android");
        setContentView(w);
        /**/
        myJsInterface.webview = w;

        appState=0;
    }

    @Override
    protected void onResume() {
        super.onResume();
        myJsInterface.activity=this;
        MyloWearService.activity=this;
        /*CREATION LOCATION OBJECT*/
        Context con = getApplicationContext();
        Log.i(TAG,"avant mylocation creation");
        myLocationObject = new LocationHandler(con,this);
        Log.i(TAG,"après mylocation creation");
        //Get user last known location
        currentLoc = myLocationObject.getLocation();

        // Acquire a reference to the system Location Manager
        sendGATrackerEvent("Flags", "Resume_App", "");
        if(onCreate){
            //CHECK FOR UPDATES AND REFRESH IF ANY
            refreshUserDatas();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        //STOP LOCATION UPDATE REQUEST
        myLocationObject.disconnectLocationHandler();
        myJsInterface.activity = null;
        MyloWearService.activity = null;
    }

    @Override
    protected void onStop(){
        super.onStop();
    }

    @Override
    public void onBackPressed() {
        if(appState==1){
            if(webviewEndOfLoad){
                w.loadUrl("javascript:androidBackButtonPressed()");
            }
        }else {
            sendGATrackerEvent("Button_click", "back_button", "close_app");
            super.onBackPressed();
        }
    }

    public void refreshUserDatas(){
        if(updated){
            Log.i(TAG, "updates detected: calling readDatas");
            readDatas();
            updated=false;
        }else {Log.i(TAG, "No updates");}
    }

    private void readDatas() {
        String FILENAME = "data.txt";

        if(isExternalStorageReadable()){
            String root = Environment.getExternalStorageDirectory().toString();
            File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");

            File file = new File (myDir, FILENAME);
            if (file.exists ()){
                try {
                    FileInputStream fis = new FileInputStream(file);
                    InputStreamReader isr = new InputStreamReader(fis,"UTF-8");
                    BufferedReader bufferedReader = new BufferedReader(isr);
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        sb.append(line);
                    }
                    isr.close();
                    fis.close();

                    if(!onCreate){
                        Log.i(TAG,"onCreate=false => calling javascript init");
                        //Log.v(TAG,"read data= '"+sb.toString()+"'");
                        //Log.i(TAG,"webviewEndOfLoad="+webviewEndOfLoad);
                        if(webviewEndOfLoad){
                            String converted = Base64.encodeToString(sb.toString().getBytes("UTF-8"), Base64.DEFAULT);
                            String url="javascript:initUserDatas('"+converted+"')";
                            w.loadUrl(url);
                        }
                        onCreate=true;
                    }else{
                        Log.i(TAG,"onCreate=true");
                        if(webviewEndOfLoad){
                            //Log.v(TAG,"onCreate=true => webviewEndOfLoad");
                            String converted = Base64.encodeToString(sb.toString().getBytes("UTF-8"), Base64.DEFAULT);
                            w.loadUrl("javascript:refreshData('"+converted+"')");
                        }
                    }


                } catch (Exception e) {
                    e.printStackTrace();
                    sendGATrackerEvent("Action_fail", "read_data", "error while reading data");
                }
            }else{
                Log.i(TAG,"file"+FILENAME+" doesn't exist, creating one new file data.txt");
                w.loadUrl("javascript:initUserDatas('')");
            }
        }else{
            Log.e(TAG,"error while reading file: external storage not readable");
            sendGATrackerEvent("Action_fail", "read_data", "not_readable");
        }

    }

    /***/
    private boolean fileExistence(String FILE){
        File file = getFileStreamPath(FILE);
        return file.exists();
    }
    /* Checks if external storage is available to at least read */
    public static boolean isExternalStorageReadable() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state) ||
                Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
            return true;
        }
        return false;
    }

    synchronized Tracker getTracker() {
        GoogleAnalytics analytics = GoogleAnalytics.getInstance(this);
        Tracker t = analytics.newTracker(PROPERTY_ID);
        return t;
    }

    public void sendGATrackerEvent(String category, String action, String label){
        if (category != null && action != null && label != null) {
            //Tracker t = analytics.newTracker(UA-51649868-2);
            Tracker t = getTracker();
            t.send(new HitBuilders.EventBuilder()
                    .setCategory(category)
                    .setAction(action)
                    .setLabel(label)
                    .build());
        }
    }

    @Override
    public void onLocationUpdate(Location location) {
        currentLoc=location;
        if(webviewEndOfLoad){
            w.loadUrl("javascript:setUserPosition("+myLocationObject.currentLocation.getLatitude()+","+myLocationObject.currentLocation.getLongitude()+")");
        }
    }
}

class myJsInterface {

    private Context con;
    public static MyActivity activity;
    public static WebView webview;
    private static final String TAG = myJsInterface.class.getSimpleName();

    public myJsInterface(Context con) {
        this.con = con;
    }

    @JavascriptInterface
    public void showToast(String mssg) {

        if (mssg != null && mssg.length() > 0) {
            android.widget.Toast toast = android.widget.Toast.makeText(con, mssg, android.widget.Toast.LENGTH_SHORT);
            toast.setGravity(Gravity.CENTER_VERTICAL|Gravity.CENTER_HORIZONTAL, 0, 0);
            toast.show();
        }

    }

    @JavascriptInterface
    public void showOnMaps(String uri) {

        if (uri != null && uri.length() > 0) {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
            con.startActivity(intent);
        }

    }

    @JavascriptInterface
    public void share(String mssg) {

        if (mssg != null && mssg.length() > 0) {
            Intent sendIntent = new Intent();
            sendIntent.setAction(Intent.ACTION_SEND);
            sendIntent.putExtra(Intent.EXTRA_TEXT, mssg);
            sendIntent.setType("text/plain");
            con.startActivity(sendIntent);
        }

    }

    @JavascriptInterface
    public void addGAEvent(String category, String action, String label) {
        if (category != null && action != null && label != null) {
            if (activity != null) {
                final String categoryFinal = category;
                final String actionFinal = action;
                final String labelFinal = label;
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //Log.v(TAG,"Calling Activity sendGATrackerEvent method");
                        activity.sendGATrackerEvent(categoryFinal, actionFinal, labelFinal);
                    }
                });
            }
        }

    }

    @JavascriptInterface
    public void setAppState(int state) {
        MyActivity.appState = state;
    }

    @JavascriptInterface
    public void phoneVibrate(int milliseconds) {
        Vibrator v = (Vibrator) con.getSystemService(Context.VIBRATOR_SERVICE);
        // Vibrate for milliseconds milliseconds
        v.vibrate(milliseconds);
    }

    @JavascriptInterface
    public void storeDatas(String datas) {
        String FILENAME = "data.txt";

        if(isExternalStorageWritable()){
            String root = Environment.getExternalStorageDirectory().toString();
            File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");
            //myDir.mkdirs();
            if (!myDir.exists ()){
                Log.i(TAG, "STORE DATA: DIRECTORY DOESN'T EXISTS creating directory: " + root);
                myDir.mkdirs();
            }
            File file = new File (myDir, FILENAME);

            try{
                FileOutputStream fos = new FileOutputStream(file);
                fos.write(datas.getBytes());
                fos.close();
            }catch (java.io.IOException e){
                Log.e("error while writing file","error while writing file");
                e.printStackTrace();
                addGAEvent("Action_fail", "write_data", "error while writing file");
            }
        }else{
            Log.e("error while writing file","external storage not writable");
            addGAEvent("Action_fail", "write_data", "not_writable");
        }

    }

    /* Checks if external storage is available for read and write */
    static public boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            return true;
        }
        return false;
    }
}
