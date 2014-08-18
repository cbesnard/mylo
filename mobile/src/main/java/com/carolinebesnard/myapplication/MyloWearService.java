package com.carolinebesnard.myapplication;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.os.Environment;
import android.util.Log;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.Wearable;
import com.google.android.gms.wearable.WearableListenerService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Locale;

/**
 * Created by carolinebesnard on 17/07/2014.
 */
public class MyloWearService extends WearableListenerService {

    private String userDatas;
    private GoogleApiClient mGoogleApiClient;
    static public final String PATH_STRING = "/MESSAGE";

    @Override
    public void onCreate(){
        super.onCreate();
        Log.i("on create called", "in myloWearService");

        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(Wearable.API)
                .build();
        mGoogleApiClient.connect();
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent){
        super.onMessageReceived(messageEvent);
        Log.i("in onMessageReceived !!!","message:"+messageEvent);

        if("/MESSAGE".equals(messageEvent.getPath())) {
            // launch some Activity or do anything you like
            Log.i("in if /Message","message:"+messageEvent);
            //GET USER LOCATION !!!
            LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
            locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
            //
            String locationProvider = LocationManager.NETWORK_PROVIDER;
            Location lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
            makeUseOfNewLocation(lastKnownLocation);
            lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            makeUseOfNewLocation(lastKnownLocation);
            Log.i("Get location ","current loc:"+MyActivity.currentLoc);

            //GET ADDR FROM LOCATION
            Geocoder geocoder;
            List<Address> addresses;
            geocoder = new Geocoder(this, Locale.getDefault());
            String address = new String();
            try {
                addresses = geocoder.getFromLocation(MyActivity.currentLoc.getLatitude(), MyActivity.currentLoc.getLongitude(), 1);
                //String addr = addresses.get(0).getAddressLine(0);
                String addr = String.format(
                        "%s, %s, %s",
                        // If there's a street address, add it
                        addresses.get(0).getMaxAddressLineIndex() > 0 ?
                                addresses.get(0).getAddressLine(0) : "",
                        // Locality is usually a city
                        addresses.get(0).getLocality(),
                        // The country of the address
                        addresses.get(0).getCountryName());
                address = "GPS location near: "+addr;
                //String city = addresses.get(0).getAddressLine(1);
                //String country = addresses.get(0).getAddressLine(2);
            } catch (IOException e) {
                e.printStackTrace();
            }
            //READ USER DATAS
            readDatas();
            Log.v("read data = ",userDatas);

            try {
                //DE-STRINGIFY DATA INTO AN OBJECT
                JSONObject obj = new JSONObject(userDatas);
                JSONArray mylocs = obj.getJSONArray("locs");
                //CREATE ID FOR NEW LOC
                int index = mylocs.length()-1;
                JSONObject lastloc = mylocs.getJSONObject(index);
                int id = lastloc.getInt("id")+1;
                //CREATE NEW LOC
                JSONObject newLoc = new JSONObject("{\"id\":"+id+",\"name\":\"\",\"group\":0,\"lat\":"+MyActivity.currentLoc.getLatitude()+",\"lon\":"+MyActivity.currentLoc.getLongitude()+",\"adr\":\""+address+"\",\"country\":\"\",\"publicName\":\"\",\"gps\":1}");
                //{"id":0,"name":"work","group":0,"lat":48.8708832,"lon":2.346594,"adr":"GPS location near: Mail, Paris, France","country":"","publicName":"","gps":1},

                //ADD NEW LOC TO location OBJECT
                mylocs.put(newLoc);
                Log.v("new locs obj= ",mylocs.toString());

                //ADD NEW LOC TO DATA OBJECT
                obj.put("locs",mylocs);
                Log.v("new userDatas obj= ",obj.toString());

                //STRINGIFY DATA //WRITE USER DATAS
                storeDatas(obj.toString());

                //MESSAGE WEAR FOR END OF LOAD
                if(mGoogleApiClient == null){
                    return;
                }
                Log.i("mGoogleApiClient","="+mGoogleApiClient.toString());
                byte [] data = new byte[]{(byte)1};
                Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }

    /** Make use of new location */
    public void makeUseOfNewLocation(Location loc) {
        if(MyActivity.isBetterLocation(loc,MyActivity.currentLoc)){
            Log.v("new best location", "lat:"+loc.getLatitude()+"lon:"+loc.getLongitude());
            MyActivity.currentLoc=loc;
            //do what i need to do here
        }
    }

    private void readDatas() {
        Log.v("in read data method","in read data method");
        String FILENAME = "data.txt";

        if(MyActivity.isExternalStorageReadable()){
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
                    userDatas = sb.toString();
                    //Log.v("read data = ",userDatas);
                    //Log.v("call javascript ","initUserDatas ");
                    //w.loadUrl("javascript:initUserDatas('"+sb.toString()+"')");

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }else{
                Log.v("file doesn't exist","file"+FILENAME+" doesn't exist");
                //w.loadUrl("javascript:initUserDatas('')");
            }
        }else{
            Log.v("error while reading file","external storage not readable");
        }

    }

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
        if(myJsInterface.isExternalStorageWritable()){
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
}
