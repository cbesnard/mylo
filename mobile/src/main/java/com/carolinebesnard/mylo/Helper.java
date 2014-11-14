package com.carolinebesnard.mylo;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;
import android.view.Gravity;

import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.wearable.Wearable;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.List;
import java.util.Locale;

/**
 * Created by carolinebesnard on 11/10/2014.
 */
public class Helper {
    public static MyActivity activity;
    private static Context context;
    private static final String TAG = Helper.class.getSimpleName();

    public static String getAddrFromGPS(Double lat, Double lng){
        //GET CONTEXT
        context = activity.getBaseContext();
        //GET ADDR FROM LOCATION
        Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(context, Locale.getDefault());
        try {
            addresses = geocoder.getFromLocation(lat, lng, 1);
            if(addresses==null){
                //error case
                Log.i(TAG,"Get location address ERROR: Couldn't get location address");
                return null;
            }
            String address = String.format(
                    "%s, %s, %s",
                    // If there's a street address, add it
                    addresses.get(0).getMaxAddressLineIndex() > 0 ?
                            addresses.get(0).getAddressLine(0) : "",
                    // Locality is usually a city
                    addresses.get(0).getLocality(),
                    // The country of the address
                    addresses.get(0).getCountryName());
            Log.i(TAG,"Get location address SUCCESS: address="+address);
            return address;
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.i(TAG,"Get location address ERROR: Couldn't get location address, send error message to wear service");
            return null;
        }
    }

    public static MyloPlace getMyloPlaceFromQ(String address){
        //GET CONTEXT
        context = activity.getBaseContext();
        //GET ADDR FROM LOCATION
        Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(context, Locale.getDefault());
        try {
            addresses = geocoder.getFromLocationName(address, 1);
            Log.i(TAG,"adresses length"+addresses.size());
            if(addresses.isEmpty()){
                return null;
            }else {
                Address addr = addresses.get(0);
                MyloPlace myloPlace = new MyloPlace(Locale.getDefault());
                myloPlace.setFeatureName(addr.getFeatureName());
                myloPlace.setLatitude(addr.getLatitude());
                myloPlace.setLongitude(addr.getLongitude());
                //
                String addressString = String.format(
                        "%s, %s, %s",
                        // If there's a street address, add it
                        addr.getMaxAddressLineIndex() > 0 ?
                                addresses.get(0).getAddressLine(0) : "",
                        // Locality is usually a city
                        addr.getLocality(),
                        // The country of the address
                        addr.getCountryName());
                myloPlace.setAddress(addressString);
                //LatLng gps = new LatLng(addresses.get(0).getLatitude(), addresses.get(0).getLongitude());
                return myloPlace;
            }
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.e(TAG, "Get location address ERROR: Couldn't get Address object, send error message to wear service");
            return null;
        }
    }

    /*public static LatLng getGPSFromAddr(String address){
        //GET CONTEXT
        context = activity.getBaseContext();
        //GET ADDR FROM LOCATION
        Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(context, Locale.getDefault());
        try {
            addresses = geocoder.getFromLocationName(address, 1);

            LatLng gps = new LatLng(addresses.get(0).getLatitude(), addresses.get(0).getLongitude());
            return gps;
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.i(TAG,"Get location address ERROR: Couldn't get location address, send error message to wear service");
            return null;
        }
    }*/

    public static void showToast(String mssg) {
        context = activity.getBaseContext();
        if (mssg != null && mssg.length() > 0) {
            android.widget.Toast toast = android.widget.Toast.makeText(context, mssg, android.widget.Toast.LENGTH_SHORT);
            toast.setGravity(Gravity.CENTER_VERTICAL|Gravity.CENTER_HORIZONTAL, 0, 0);
            toast.show();
        }

    }

    public static String parseShareIntentText(String sharedText){
        String text = sharedText.replace("\n"," ");

        String[] words = text.split(" ");
        int index =-1;
        String url = null;
        for(int i=0; i<words.length;i++){
            if(words[i].matches(".*http://goo.gl/maps/.*")){
                Log.i(TAG,"Maps url detected! txt="+sharedText);
                index = i;
                url = IntentUriAnalyser.shortUrlCase(words[index]);
                break;
            }else if (words[i].matches(".*maps.google.com/.*")){
                Log.i(TAG,"Maps url detected! txt="+words[i]);
                index = i;
                url = IntentUriAnalyser.extractIntent(Uri.parse(words[index]));
                break;
            }
        }

        /*if(index!=-1){
            Log.i(TAG,words[index]);
            String url = IntentUriAnalyser.shortUrlCase(words[index]);
            return url;
        }else {
            for(int i=0; i<words.length;i++){
                if(words[i].matches(".*maps.google.com/.*")){
                    Log.i(TAG,"Maps url detected! txt="+words[i]);
                    index = i;
                    break;
                }
            }
            if(index!=-1){
                Log.i(TAG,words[index]);
                String url = IntentUriAnalyser.extractIntent(Uri.parse(words[index]));
                return url;
            }
        }*/
        return url;
    }

    public static String jsCallFromData(String data){
        //DE-STRINGIFY DATA INTO AN OBJECT
        JSONObject obj = null;
        JSONArray mylocs = null;
        JSONArray updatedLocs = new JSONArray();
        try {
            obj = new JSONObject(data);
            mylocs = obj.getJSONArray("locs");

            for (int i = 0; i < mylocs.length(); i++) {
                try {
                    JSONObject loc = mylocs.getJSONObject(i);
                    if(loc.getString("adr").equals("")){
                        //GET ADDR FROM GPS
                        String addr = getAddrFromGPS(loc.getDouble("lat"),loc.getDouble("lon"));
                        if(addr!=null){
                            loc.put("adr",addr);
                            //STORE LOC IN NEW JSONARRAY
                            updatedLocs.put(loc);
                        }
                    }
                } catch (JSONException e){

                }
            }
            if(updatedLocs.length()>0){
                //STRINGIFY UPDATEDLOCS ARRAY
                String converted = Base64.encodeToString(updatedLocs.toString().getBytes("UTF-8"), Base64.DEFAULT);
                //BUILD JSCALL
                String url="javascript:updateLocs('"+converted+"')";
                return url;
            }else {return null;}

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
