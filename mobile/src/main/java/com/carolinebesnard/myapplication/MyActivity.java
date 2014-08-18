package com.carolinebesnard.myapplication;

import android.app.Activity;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Environment;
import android.view.Menu;
import android.view.MenuItem;
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



public class MyActivity extends Activity {

    private static final int TWO_MINUTES = 1000 * 60 * 2;
    public static Location currentLoc;
    public WebView w;
    private boolean onCreate;
    private boolean webviewEndOfLoad=false;
    private LocationListener locationListener;
    public LocationManager locationManager;
    public static int appState;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_my);
        w = new WebView(this);
        w.getSettings().setJavaScriptEnabled(true);
        w.setWebContentsDebuggingEnabled (true);
        w.setWebViewClient(new WebViewClient() {

            public void onPageFinished(WebView view, String url) {
                // do your stuff here
                w.loadUrl("javascript:setUserPosition("+currentLoc.getLatitude()+","+currentLoc.getLongitude()+")");
                //
                readDatas();
                webviewEndOfLoad=true;
            }
        });
        w.loadUrl("file:///android_asset/www/index.html");
        w.addJavascriptInterface(new myJsInterface(this), "Android");
        setContentView(w);
        /**/
        // Acquire a reference to the system Location Manager
        locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        //
        String locationProvider = LocationManager.NETWORK_PROVIDER;
        Location lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
        makeUseOfNewLocation(lastKnownLocation);
        lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        makeUseOfNewLocation(lastKnownLocation);
        //currentLoc = lastKnownLocation;
        //
        onCreate=false;
        appState=0;
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Acquire a reference to the system Location Manager
        /**/
        String locationProvider = LocationManager.NETWORK_PROVIDER;
        Location lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
        makeUseOfNewLocation(lastKnownLocation);
        lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        makeUseOfNewLocation(lastKnownLocation);
        // Define a listener that responds to location updates
        locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                // Called when a new location is found by the network location provider.
                makeUseOfNewLocation(location);
                Log.v("location changed", "lat:"+location.getLatitude()+"lon:"+location.getLongitude());
            }
            public void onStatusChanged(String provider, int status, Bundle extras) {}
            public void onProviderEnabled(String provider) {}
            public void onProviderDisabled(String provider) {}
        };
        // Register the listener with the Location Manager to receive location updates
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000, 5, locationListener);
    }

    @Override
    protected void onPause() {
        super.onPause();
        locationManager.removeUpdates(locationListener);
    }

    @Override
    public void onBackPressed() {
        if(appState==1){
            if(webviewEndOfLoad){
                w.loadUrl("javascript:androidBackButtonPressed()");
            }
        }else {
            super.onBackPressed();
        }
    }

    /*@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.my, menu);
        return true;
    }*/

    /*@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }*/

    /** Determines whether one Location reading is better than the current Location fix
     * @param location  The new Location that you want to evaluate
     * @param currentBestLocation  The current Location fix, to which you want to compare the new one
     */
    public static boolean isBetterLocation(Location location, Location currentBestLocation) {
        if (currentBestLocation == null) {
            // A new location is always better than no location
            return true;
        }

        // Check whether the new location fix is newer or older
        long timeDelta = location.getTime() - currentBestLocation.getTime();
        boolean isSignificantlyNewer = timeDelta > TWO_MINUTES;
        boolean isSignificantlyOlder = timeDelta < -TWO_MINUTES;
        boolean isNewer = timeDelta > 0;

        // If it's been more than two minutes since the current location, use the new location
        // because the user has likely moved
        if (isSignificantlyNewer) {
            return true;
            // If the new location is more than two minutes older, it must be worse
        } else if (isSignificantlyOlder) {
            return false;
        }

        // Check whether the new location fix is more or less accurate
        int accuracyDelta = (int) (location.getAccuracy() - currentBestLocation.getAccuracy());
        boolean isLessAccurate = accuracyDelta > 0;
        boolean isMoreAccurate = accuracyDelta < 0;
        boolean isSignificantlyLessAccurate = accuracyDelta > 200;

        // Check if the old and new location are from the same provider
        boolean isFromSameProvider = isSameProvider(location.getProvider(),currentBestLocation.getProvider());

        // Determine location quality using a combination of timeliness and accuracy
        if (isMoreAccurate) {
            return true;
        } else if (isNewer && !isLessAccurate) {
            return true;
        } else if (isNewer && !isSignificantlyLessAccurate && isFromSameProvider) {
            return true;
        }
        return false;
    }

    /** Checks whether two providers are the same */
    public static boolean isSameProvider(String provider1, String provider2) {
        if (provider1 == null) {
            return provider2 == null;
        }
        return provider1.equals(provider2);
    }

    /** Make use of new location */
    public void makeUseOfNewLocation(Location loc) {
        if(currentLoc !=null){
            if(isBetterLocation(loc,currentLoc)){
                Log.v("new best location", "lat:"+loc.getLatitude()+"lon:"+loc.getLongitude());
                currentLoc=loc;
                if(webviewEndOfLoad){
                    w.loadUrl("javascript:setUserPosition("+currentLoc.getLatitude()+","+currentLoc.getLongitude()+")");
                }
            }
        }else{
            currentLoc = loc;
        }
    }
    /***/
    private void readDatas() {
        Log.v("in read data method","in read data method");
        String FILENAME = "data.txt";

        /*if(fileExistence(FILENAME)){
            try{
                FileInputStream fis = openFileInput(FILENAME);
                InputStreamReader isr = new InputStreamReader(fis);
                BufferedReader bufferedReader = new BufferedReader(isr);
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    sb.append(line);
                }
                isr.close();
                Log.v("call javascript ","initUserDatas ");
                w.loadUrl("javascript:initUserDatas('"+sb.toString()+"')");

            }catch (java.io.IOException e){
                Log.v("read file","error: ");
                e.printStackTrace();
            }
        }else{
            Log.v("file doesn't exist","file"+FILENAME+" doesn't exist");
            w.loadUrl("javascript:initUserDatas('')");
        }*/
        if(isExternalStorageReadable()){
            String root = Environment.getExternalStorageDirectory().toString();
            Log.v("external storage file ","root: "+root);
            File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");
            //myDir.mkdirs();

            File file = new File (myDir, FILENAME);
            if (file.exists ()){
                try {
                    FileInputStream fis = new FileInputStream(file);
                    InputStreamReader isr = new InputStreamReader(fis);
                    BufferedReader bufferedReader = new BufferedReader(isr);
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        sb.append(line);
                    }
                    isr.close();
                    fis.close();
                    Log.v("read data = ",sb.toString());
                    Log.v("call javascript ","initUserDatas ");
                    //w.loadUrl("javascript:initUserDatas('"+sb.toString()+"')");
                    w.loadUrl("javascript:initUserDatas('"+sb+"')");
                    //w.loadUrl("javascript:initUserDatas('')");

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }else{
                Log.v("file doesn't exist","file"+FILENAME+" doesn't exist");
                w.loadUrl("javascript:initUserDatas('')");
            }
        }else{
            Log.v("error while reading file","external storage not readable");
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

}

class myJsInterface {

    private Context con;

    public myJsInterface(Context con) {
        this.con = con;
    }

    @JavascriptInterface
    public void showToast(String mssg) {

        if (mssg != null && mssg.length() > 0) {
            //Toast.makeText(cordova.getActivity().getApplicationContext(),
            //        message, Toast.LENGTH_SHORT).show();
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
    public void setAppState(int state) {
        MyActivity.appState = state;
    }


    @JavascriptInterface
    public void storeDatas(String datas) {
        Log.v("storeDatas android method called","in android storeDatas ");
        String FILENAME = "data.txt";
        /*try{
            FileOutputStream fos = con.openFileOutput (FILENAME, Context.MODE_PRIVATE);
            fos.write(datas.getBytes());
            fos.close();
        }catch (java.io.IOException e){
            Log.v("error while writing file","error while writing file");
            e.printStackTrace();
        }*/
        if(isExternalStorageWritable()){
            String root = Environment.getExternalStorageDirectory().toString();
            Log.v("external storage file ","root: "+root);
            File myDir = new File(root + "/Android/data/com.carolinebesnard.mylo/files");
            //myDir.mkdirs();
            if (!myDir.exists ()){
                Log.v("external storage DIRECTORY DOESN'T EXISTS ","directory: "+root);
                myDir.mkdirs();
            }
            File file = new File (myDir, FILENAME);

            try{
                FileOutputStream fos = new FileOutputStream(file);
                fos.write(datas.getBytes());
                fos.close();
            }catch (java.io.IOException e){
                Log.v("error while writing file","error while writing file");
                e.printStackTrace();
            }
        }else{
            Log.v("error while writing file","external storage not writable");
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
