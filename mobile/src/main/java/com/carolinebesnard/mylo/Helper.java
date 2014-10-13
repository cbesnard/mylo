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

    public static Address getAddressObject(String address){
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
                //LatLng gps = new LatLng(addresses.get(0).getLatitude(), addresses.get(0).getLongitude());
                return addr;
            }
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.e(TAG, "Get location address ERROR: Couldn't get Address object, send error message to wear service");
            return null;
        }
    }

    public static LatLng getGPSFromAddr(String address){
        //GET CONTEXT
        context = activity.getBaseContext();
        //GET ADDR FROM LOCATION
        Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(context, Locale.getDefault());
        try {
            addresses = geocoder.getFromLocationName(address, 1);
            /*String returnedAddress = String.format(
                    "%s, %s, %s",
                    // If there's a street address, add it
                    addresses.get(0).getMaxAddressLineIndex() > 0 ?
                            addresses.get(0).getAddressLine(0) : "",
                    // Locality is usually a city
                    addresses.get(0).getLocality(),
                    // The country of the address
                    addresses.get(0).getCountryName());*/
            //TODO CHECK IF RETURNED ADDR IS SAME AS GIVEN
            LatLng gps = new LatLng(addresses.get(0).getLatitude(), addresses.get(0).getLongitude());
            return gps;
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.i(TAG,"Get location address ERROR: Couldn't get location address, send error message to wear service");
            return null;
        }
    }

    public static void showToast(String mssg) {
        context = activity.getBaseContext();
        if (mssg != null && mssg.length() > 0) {
            android.widget.Toast toast = android.widget.Toast.makeText(context, mssg, android.widget.Toast.LENGTH_SHORT);
            toast.setGravity(Gravity.CENTER_VERTICAL|Gravity.CENTER_HORIZONTAL, 0, 0);
            toast.show();
        }

    }
}
