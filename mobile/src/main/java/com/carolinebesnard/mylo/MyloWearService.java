package com.carolinebesnard.mylo;

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
import java.io.InputStreamReader;
import java.util.List;
import java.util.Locale;

/**
 * Created by carolinebesnard on 17/07/2014.
 */
public class MyloWearService extends WearableListenerService {
    public static MyActivity activity;
    private String userDatas;
    private GoogleApiClient mGoogleApiClient;
    static public final String PATH_STRING = "MYLO/ADD_NEW_LOC";
    private static final String TAG = MyloWearService.class.getSimpleName();

    @Override
    public void onCreate(){
        super.onCreate();
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(Wearable.API)
                .build();
        mGoogleApiClient.connect();
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent){
        super.onMessageReceived(messageEvent);
        Log.i(TAG,"Message received SUCCESS: message.getpath="+messageEvent.getPath()+" message="+messageEvent.getData().toString());

        if(PATH_STRING.equals(messageEvent.getPath())) {
            //GET USER LOCATION !!!
            LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
            locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
            //
            String locationProvider = LocationManager.NETWORK_PROVIDER;
            Location lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
            makeUseOfNewLocation(lastKnownLocation);
            lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            makeUseOfNewLocation(lastKnownLocation);
            //Log.i(TAG,"Get location: current loc="+MyActivity.currentLoc);

            if(MyActivity.currentLoc!=null){
                Log.i(TAG,"Get user location SUCCESS: current loc="+MyActivity.currentLoc);
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
                    Log.i(TAG,"Get location address SUCCESS: address="+address);
                } catch (Exception e) {
                    e.printStackTrace();
                    //error case
                    Log.i(TAG,"Get location address ERROR: Couldn't get location address, send error message to wear service");
                    //Log.i(TAG,"mGoogleApiClient="+mGoogleApiClient.toString());
                    byte [] data = new byte[]{(byte)0};
                    Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);
                }
                //READ USER DATAS
                readDatas();
                //Log.v("read data = ",userDatas);
                if(address.length()>0){
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

                        //ADD NEW LOC TO DATA OBJECT
                        obj.put("locs",mylocs);

                        //STRINGIFY DATA //WRITE USER DATAS
                        storeDatas(obj.toString());

                        Log.i(TAG,"Store new location SUCCESS");
                        //
                        MyActivity.updated = true;
                        callRefreshUserDatas();
                        //MESSAGE WEAR FOR END OF LOAD SUCCESS
                        if(mGoogleApiClient == null){
                            return;
                        }
                        //Log.i(TAG,"Send message to wear: mGoogleApiClient="+mGoogleApiClient.toString());
                        byte [] data = new byte[]{(byte)1};
                        Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);

                    } catch (JSONException e) {
                        e.printStackTrace();
                        //error case
                        Log.i(TAG,"ERROR: Couldn't store new location address: send error message wear service");
                        //Log.i(TAG,"mGoogleApiClient="+mGoogleApiClient.toString());
                        //MESSAGE WEAR FOR END OF LOAD
                        if(mGoogleApiClient == null){
                            return;
                        }
                        byte [] data = new byte[]{(byte)0};
                        Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);
                    }
                }else{
                    //error case
                    Log.i(TAG,"Couldn't get location address, address is empty: send error message wear service");
                    //Log.i(TAG,"mGoogleApiClient="+mGoogleApiClient.toString());
                    byte [] data = new byte[]{(byte)0};
                    Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);
                }

            }else {//MyActivity.currentLoc is null => no good and accurate location found
                //error case
                Log.i(TAG,"ERROR: MyActivity.currentLoc is null: couldn't find accurate user location: sending error message to wear");
                //Log.i(TAG,"mGoogleApiClient="+mGoogleApiClient.toString());
                //MESSAGE WEAR FOR END OF LOAD
                if(mGoogleApiClient == null){
                    Log.i(TAG,"ERROR: mGoogleApiClient is null : couldn't send message to wear");
                    return;
                }
                byte [] data = new byte[]{(byte)0};
                Wearable.MessageApi.sendMessage(mGoogleApiClient, "", PATH_STRING, data);
            }


        }
    }
    public void callRefreshUserDatas(){
        if (activity!=null){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.refreshUserDatas();
                }
            });
        }
    }
    /** Make use of new location */
    public void makeUseOfNewLocation(Location loc) {
        Log.i(TAG,"In makeUseOfNewLocation method");
        if(MyActivity.currentLoc !=null){
            Log.i(TAG,"MyActivity.currentLoc: lat="+MyActivity.currentLoc.getLatitude()+" , lon="+MyActivity.currentLoc.getLongitude());
        }
        if(loc!=null){
            Log.i(TAG,"Last known loc=: lat="+loc.getLatitude()+" , lon="+loc.getLongitude());
        }
        if(MyActivity.isBetterLocation(loc,MyActivity.currentLoc)){
            MyActivity.currentLoc=loc;
        }
    }

    private void readDatas() {
        //Log.v("in read data method","in read data method");
        String FILENAME = "data.txt";

        if(MyActivity.isExternalStorageReadable()){
            String root = Environment.getExternalStorageDirectory().toString();
            //Log.v(TAG,"external storage file root: "+root);
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
                    Log.i(TAG,"Read data SUCCESS");
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.e(TAG,"ERROR while reading data");
                }
            }else{
                Log.e(TAG,"ERROR: file"+FILENAME+" doesn't exist");
            }
        }else{
            Log.e(TAG,"ERROR while reading data: external storage not readable");
        }

    }

    public void storeDatas(String datas) {
        String FILENAME = "data.txt";
        if(myJsInterface.isExternalStorageWritable()){
            String root = Environment.getExternalStorageDirectory().toString();
            //Log.v("external storage file ","root: "+root);
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
                Log.i(TAG,"ERROR while writing data");
                e.printStackTrace();
            }
        }else{
            Log.i(TAG,"ERROR while writing data: external storage not writable");
        }

    }
}
