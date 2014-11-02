package com.carolinebesnard.mylo;

import android.app.Activity;
import android.app.backup.BackupManager;
import android.app.backup.RestoreObserver;
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
import java.util.Locale;

import android.content.Intent;
import android.net.Uri;
import android.widget.FrameLayout;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;
import com.google.android.gms.maps.model.LatLng;


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
    private Intent myintent=null;
    private String intentAction=null;
    private Uri intentData=null;
    private String intentType=null;
    private static final String TAG = MyActivity.class.getSimpleName();
    private static final String PROPERTY_ID = "UA-51649868-2";

    private BackupManager bm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.i(TAG, "MYLO V2.6.6");
        super.onCreate(savedInstanceState);
        updated = false;
        onCreate=false;

        init();

        migrate();

        setContentView(w);

        /**/
        myJsInterface.webview = w;

        appState=0;
    }

    private void init() {
        /*get intent*/
        myintent = getIntent();
        intentData = getIntent().getData();

        bm = new BackupManager(this);
        FrameLayout container = new FrameLayout(this.getApplicationContext());

        initLocationData();
        initWebView();
    }

    /**
     * Creates the data location file if needed
     */
    private void initLocationData() {
        /*String root = Environment.getExternalStorageDirectory().toString();
        File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");

        if (!myDir.exists ()) {
            Log.i(TAG, "STORE DATA: DIRECTORY DOESN'T EXISTS creating directory: " + root);
            myDir.mkdirs();
        }*/

        File file = new File (this.getFilesDir(), MyloBackupAgentHelper.LOCATION_FILE_NAME);

        if (!file.exists()) {
            synchronized (MyloBackupAgentHelper.locationDataLock) {
                try {
                    FileOutputStream fos = new FileOutputStream(file);
                    fos.close();
                } catch (java.io.IOException e) {
                    Log.e("error while writing file", "error while writing file");
                }
            }
        }
    }

    private void initWebView() {
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
                readData();
            }
        });
        w.loadUrl("file:///android_asset/www/index.html");
        w.addJavascriptInterface(new myJsInterface(this, bm), "Android");
    }

    /**
     * Method that takes location information form external storage directory
     * to Android usual file directory
     */
    private void migrate() {
        Log.i(TAG, "File migration check");
        String root = Environment.getExternalStorageDirectory().toString();
        File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");

        if (myDir.exists ()) {

            File file = new File(myDir, MyloBackupAgentHelper.LOCATION_FILE_NAME);
            File dataFile = new File(this.getFilesDir(), MyloBackupAgentHelper.LOCATION_FILE_NAME);
            //dataFile.delete();

            boolean empty = !dataFile.exists() || dataFile.length() == 0;

            if (file.exists() && empty) {
                Log.i(TAG, "Migration needed");
                try {
                    FileOutputStream fos = new FileOutputStream(dataFile);

                    FileInputStream fis = new FileInputStream(file);
                    InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
                    BufferedReader bufferedReader = new BufferedReader(isr);

                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        sb.append(line);
                    }

                    Log.w(TAG, "Migrating : " + sb.toString());
                    fos.write(sb.toString().getBytes());

                    fos.close();
                    fis.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Log.i(TAG, "Migration successful");
            } else {
                Log.i(TAG, "No migration needed");
            }
        }

        /*file.delete();*/
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG,"onResume called");
        myJsInterface.activity=this;
        MyloWearService.activity=this;
        Helper.activity = this;
        /*CREATION LOCATION OBJECT*/
        Context con = getApplicationContext();
        myLocationObject = new LocationHandler(con,this);
        //Get user last known location
        currentLoc = myLocationObject.getLocation();

        // Acquire a reference to the system Location Manager
        sendGATrackerEvent("Flags", "Resume_App", "");
        if(onCreate){
            Log.i(TAG,"onCreate = true");
            //CHECK FOR UPDATES AND REFRESH IF ANY
            refreshUserDatas();
            checkForIntent();
            //JS to check previous init of maps scripts
            callJS("javascript:initMapsScripts()");
        }else{
            Log.i(TAG,"onCreate = false");
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        //STOP LOCATION UPDATE REQUEST
        myLocationObject.disconnectLocationHandler();
        myJsInterface.activity = null;
        MyloWearService.activity = null;
        Helper.activity = null;
        //w=null;
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
            Log.i(TAG, "updates detected: calling readData");
            readData();
            updated=false;
        }else {Log.i(TAG, "No updates");}
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        myintent = intent;
        intentData = intent.getData();
        Log.i(TAG,"onNewIntent called");
    }

    private void checkForIntent() {
        /*CHECK FOR INTENT*/
        Log.i(TAG,"CheckForIntent called");
        //if(getIntent()!=null){
        if(myintent==null){return;}
        if(Intent.ACTION_VIEW.equals(myintent.getAction())) {
            final Uri data = intentData;
            //Log.i(TAG,data.toString());
            if (data != null) {
                callJS("javascript:launchLoader()");
                Thread thread = new Thread(new Runnable() {
                    //private Uri data
                    @Override
                    public void run() {
                        final String url = IntentUriAnalyser.extractIntent(data);
                        runOnUiThread(new Runnable() {
                            public void run() {
                                if (url != null) {
                                    callJS(url);
                                } else {
                                    //UNKNOWN URL FORMAT OR SERVER NOT RESPONDING
                                    callJS("javascript:stopLoader()");
                                    // SEND TOAST NOTIFICATION "Sorry, couldn't retrieve location"
                                    Helper.showToast("Sorry couldn't retrieve location :/");
                                }
                            }
                        });
                    }
                });
                thread.start();
                intentData = null;
                myintent = null;
            }
        }else if (Intent.ACTION_SEND.equals(myintent.getAction()) && myintent.getType() != null){
            Log.i(TAG,"Shared Action Intent received");
            Log.i(TAG,"intent type="+myintent.getType());
            if ("text/plain".equals(myintent.getType())) {
                final String sharedText = myintent.getStringExtra(Intent.EXTRA_TEXT);
                if (sharedText != null) {
                    Log.i(TAG,"Text="+sharedText);
                    callJS("javascript:launchLoader()");
                    Thread thread = new Thread(new Runnable() {
                        //private Uri data
                        @Override
                        public void run() {
                            final String url = Helper.parseShareIntentText(sharedText);
                            runOnUiThread(new Runnable() {
                                public void run() {
                                    if (url != null) {
                                        callJS(url);
                                    } else {
                                        //UNKNOWN URL FORMAT OR SERVER NOT RESPONDING
                                        callJS("javascript:stopLoader()");
                                        // SEND TOAST NOTIFICATION "Sorry, couldn't retrieve location"
                                        Helper.showToast("Sorry couldn't retrieve location :/");
                                    }
                                }
                            });
                        }
                    });
                    thread.start();
                }
            }
            myintent = null;
            intentData=null;
        }
    }
    public void callJS(String url) {
        if(url!=null && w!=null && webviewEndOfLoad){
            w.loadUrl(url);
        }
    }
    private void readData() {
        String FILENAME = "data.txt";

        if(isExternalStorageReadable()){
            /*String root = Environment.getExternalStorageDirectory().toString();
            File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");
            */

            File file = new File (this.getFilesDir(), FILENAME);
            /*if (file.exists ()){*/
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
                        checkForIntent();
                    }
                    onCreate=true;
                }else{
                    Log.i(TAG,"onCreate=true");
                    if(webviewEndOfLoad){
                        //Log.v(TAG,"onCreate=true => webviewEndOfLoad");
                        String converted = Base64.encodeToString(sb.toString().getBytes("UTF-8"), Base64.DEFAULT);
                        w.loadUrl("javascript:refreshData('"+converted+"')");
                        checkForIntent();
                    }
                }


            } catch (Exception e) {
                e.printStackTrace();
                sendGATrackerEvent("Action_fail", "read_data", "error while reading data");
            }

        } else {
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
        if(webviewEndOfLoad && location!=null){
            w.loadUrl("javascript:setUserPosition("+location.getLatitude()+","+location.getLongitude()+")");
        }
    }

    public void requestBackUp() {
        Log.i(TAG, "Requesting Backup");
        bm.dataChanged();
        Log.i(TAG, "Backup Requested");
    }
}

class myJsInterface {

    private Context con;
    public static MyActivity activity;
    public static WebView webview;
    private final BackupManager bm;

    private static final String TAG = myJsInterface.class.getSimpleName();

    public myJsInterface(Context con, BackupManager bm) {
        this.con = con;
        this.bm = bm;
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

            Log.i(TAG, activity.getFilesDir().getAbsolutePath());
            File file = new File (activity.getFilesDir(), FILENAME);

            boolean backupNeeded = true;
            synchronized (MyloBackupAgentHelper.locationDataLock) {
                try {
                    FileOutputStream fos = new FileOutputStream(file);
                    fos.write(datas.getBytes());
                    fos.close();
                } catch (java.io.IOException e) {
                    Log.e("error while writing file", "error while writing file");
                    backupNeeded = false;
                    e.printStackTrace();
                    addGAEvent("Action_fail", "write_data", "error while writing file");
                }
            }

            if (backupNeeded) {
                activity.requestBackUp();
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

    @JavascriptInterface
    public void getNewGPSPlaceAddrFromGPS(String lat, String lon){
        final Double latitude = Double.parseDouble(lat);
        final Double longitude = Double.parseDouble(lon);
        Log.i(TAG,"lat:"+lat+", lon:"+lon);
        Log.i(TAG,"latitude:"+latitude+", longitude:"+longitude);
        Thread thread = new Thread(new Runnable(){
            //private Uri data
            @Override
            public void run(){
                MyloPlace myloPlace = new MyloPlace(Locale.getDefault());
                myloPlace.setLatitude(latitude);
                myloPlace.setLongitude(longitude);
                //GET ADDRESS FROM GPS
                final String addr = Helper.getAddrFromGPS(latitude, longitude);
                myloPlace.setAddress(addr);
                myloPlace.setGPS(true);
                final String url = IntentUriAnalyser.urlBuilderFromMyloPlace(myloPlace);
                activity.runOnUiThread(new Runnable() {
                    public void run() {
                        if (url != null) {
                            activity.callJS(url);
                        } else {
                            //UNKNOWN URL FORMAT OR SERVER NOT RESPONDING
                            activity.callJS("javascript:stopLoader()");
                            // SEND TOAST NOTIFICATION "Sorry, couldn't retrieve location"
                            Helper.showToast("Sorry couldn't retrieve location :/");
                        }
                    }
                });
            }
        });
        thread.start();
    }
}
