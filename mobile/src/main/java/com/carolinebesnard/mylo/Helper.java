package com.carolinebesnard.mylo;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.wearable.Wearable;

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

    public static String extractIntent(Uri data){
        String scheme = data.getScheme();
        Log.i(TAG, "scheme: " + scheme);
        String host = data.getHost();
        Log.i(TAG, "host: "+host);
        List<String> params = data.getPathSegments();
        //String first = params.get(0);
        //String second = params.get(1);
        if (host.equals("maps.google.com")) {
            String value = data.getQueryParameter("q");
            if(value!=null){
                Log.i(TAG, "value: "+value);
                if (value.matches("[@][0-9]+[.]?[0-9]*[,][0-9]+[.]?[0-9]*")) {
                    //EXTRACT GPS POSITION FROM URL
                    String b = value.replace("@","");
                    String[] flostr = b.split(",");
                    double lat = Double.parseDouble(flostr[0]);
                    double lon = Double.parseDouble(flostr[1]);
                    Log.i(TAG, "lat: "+lat+" & lon: "+lon);
                    //GET ADDRESS FROM GPS
                    String addr = getAddrFromGPS(lat,lon);
                    if(addr!=null){
                        //ENCODE ADDR IN BASE64 TO SEND IT TO JS
                        String addrEncoded = null;
                        try {
                            addrEncoded= Base64.encodeToString(addr.getBytes("UTF-8"), Base64.DEFAULT);
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        //BUILD JS CALL STRING
                        String url="javascript:addGPSFromLink("+lat+","+lon+",'"+addrEncoded+"')";
                        return url;
                    }else {return null;}
                }else{
                    //Public Place
                    int i = value.indexOf(' ');
                    if(i!=-1){
                        String name = value.substring(0, i);
                        String address = value.substring(i);
                        String convertedName = null;
                        String convertedAddr = null;
                        try {
                            convertedName = Base64.encodeToString(name.getBytes("UTF-8"), Base64.DEFAULT);
                            convertedAddr = Base64.encodeToString(address.getBytes("UTF-8"), Base64.DEFAULT);
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        String url="javascript:addPublicPlaceFromLink('"+convertedName+"','"+convertedAddr+"')";
                        return url;
                    }else {return null;}
                }
            }else {
                // UNKNOWN URL FORMAT
                return null;
            }
        }
        return null;
    }

    private static String getAddrFromGPS(Double lat, Double lng){
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

    private static LatLng getGPSFromAddr(String address){
        return null;
    }
}
