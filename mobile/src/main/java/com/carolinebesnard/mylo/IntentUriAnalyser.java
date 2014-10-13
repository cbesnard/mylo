package com.carolinebesnard.mylo;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import com.google.android.gms.maps.model.LatLng;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

/**
 * Created by carolinebesnard on 13/10/2014.
 */
public class IntentUriAnalyser {
    public static MyActivity activity;
    private static Context context;
    private static final String TAG = IntentUriAnalyser.class.getSimpleName();

    public static String extractIntent(Uri data){
        String scheme = data.getScheme();
        Log.i(TAG, "scheme: " + scheme);
        String host = data.getHost();
        Log.i(TAG, "host: "+host);
        List<String> params = data.getPathSegments();
        if (host.equals("maps.google.com")) {
            String value = data.getQueryParameter("q");
            if(value!=null){
                Log.i(TAG, "value: "+value);
                if (value.matches("[@][0-9]+[.]?[0-9]*[,][0-9]+[.]?[0-9]*")) {
                    //EXTRACT GPS POSITION FROM URL
                    String b = value.replace("@","");
                    String[] flostr = b.split(",");
                    //
                    MyloPlace myloPlace = new MyloPlace(Locale.getDefault());
                    myloPlace.setLatitude(Double.parseDouble(flostr[0]));
                    myloPlace.setLongitude(Double.parseDouble(flostr[1]));
                    //GET ADDRESS FROM GPS
                    myloPlace.setAddress(Helper.getAddrFromGPS(myloPlace.getLatitude(), myloPlace.getLongitude()));
                    Log.i(TAG, "lat: "+myloPlace.getLatitude()+" & lon: "+myloPlace.getLongitude());
                    String url = urlBuilderFromMyloPlace(myloPlace);
                    return url;
                }else{//PUBLIC PLACES
                    MyloPlace addr = getMyloPlaceFromQ(value);
                    //GET url from MyloPlace
                    String url = urlBuilderFromMyloPlace(addr);
                    return url;
                }
            }else {
                value = data.getQueryParameter("cid");
                if(value!=null){
                    //GET MyloPlace from CID
                    MyloPlace myloPlace = getMyloPlaceFromCid(value);
                    //GET url from MyloPlace
                    String url = urlBuilderFromMyloPlace(myloPlace);
                    return url;
                }else{// UNKNOWN URL FORMAT
                    return null;
                }
            }
        } else if (host.equals("goo.gl")) {
            String url = shortUrlCase(data.toString());
            return url;
        }
        return null;
    }

    private static String shortUrlCase(String data){
        Log.i(TAG,data);
        try{
            //HTTP REQUEST TO GET LONG URL
            String URL = "https://www.googleapis.com/urlshortener/v1/url?shortUrl="+data;
            HttpClient httpclient = new DefaultHttpClient();
            HttpResponse response = httpclient.execute(new HttpGet(URL));
            StatusLine statusLine = response.getStatusLine();
            if(statusLine.getStatusCode() == HttpStatus.SC_OK){
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                response.getEntity().writeTo(out);
                out.close();
                String responseString = out.toString();
                Log.i(TAG,"responseString= "+responseString);
                //JSON STUFF
                JSONObject obj = new JSONObject(responseString);
                String longUrl = obj.getString("longUrl");
                //GET CID
                Uri uri=Uri.parse(longUrl);
                String value = uri.getQueryParameter("cid");
                Log.i(TAG,"value cid= "+value);
                //GET MyloPlace from CID
                MyloPlace myloPlace = getMyloPlaceFromCid(value);
                //GET url from MyloPlace
                String url = urlBuilderFromMyloPlace(myloPlace);
                return url;
            } else{
                //Closes the connection.
                response.getEntity().getContent().close();
                return null;
            }
        }catch (Exception e){
            return null;
        }
    }

    private static String urlBuilderFromMyloPlace(MyloPlace myloPlace){
        if(myloPlace!=null) {
            String address = myloPlace.getAddress();
            LatLng gps = new LatLng(myloPlace.getLatitude(), myloPlace.getLongitude());
            String name = myloPlace.getFeatureName();
            if (gps != null) {
                String convertedAddr = null;
                try {
                    convertedAddr = Base64.encodeToString(address.getBytes("UTF-8"), Base64.DEFAULT);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if(name!=null) {//PUBLIC PLACE
                    String convertedName = null;
                    try {
                        convertedName = Base64.encodeToString(name.getBytes("UTF-8"), Base64.DEFAULT);
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    String url = "javascript:addPublicPlaceFromLink('" + convertedName + "','" + convertedAddr + "'," + gps.latitude + "," + gps.longitude + ")";
                    return url;
                }else{//GPS PLACE
                    String url = "javascript:addGPSFromLink("+gps.latitude+","+gps.longitude+",'"+convertedAddr+"')";
                    return url;
                }
            } else {return null;}
        }else {return null;}
    }

    private static MyloPlace getMyloPlaceFromCid(String cid){
        Log.i(TAG,"in getMyloPlaceFromCid");
        //TODO: FIND HOW TO ANALYSE CID
        try{
            //HTTP REQUEST TO GET LONG URL
            /*String URL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+cid+"&key=AIzaSyB60Ax0BPa8GaJFTSpJ3QuIkL3KP7IqviM";
            HttpClient httpclient = new DefaultHttpClient();
            HttpResponse response = httpclient.execute(new HttpGet(URL));
            StatusLine statusLine = response.getStatusLine();
            if(statusLine.getStatusCode() == HttpStatus.SC_OK){
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                response.getEntity().writeTo(out);
                out.close();
                String responseString = out.toString();
                Log.i(TAG,"responseString= "+responseString);
            }*/
        }catch (Exception e){

        }
        return null;
    }

    public static MyloPlace getMyloPlaceFromQ(String address){
        //GET ADDR FROM LOCATION
        try {
            String URL_base = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
            String URL = URL_base+URLEncoder.encode(address,"UTF-8")+"&key=AIzaSyB60Ax0BPa8GaJFTSpJ3QuIkL3KP7IqviM";
            HttpClient httpclient = new DefaultHttpClient();
            HttpResponse response = httpclient.execute(new HttpGet(URL));
            StatusLine statusLine = response.getStatusLine();
            if(statusLine.getStatusCode() == HttpStatus.SC_OK){
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                response.getEntity().writeTo(out);
                out.close();
                String responseString = out.toString();
                //Log.i(TAG,"responseString= "+responseString);
                //JSON STUFF
                JSONObject obj = new JSONObject(responseString);
                JSONArray results = obj.getJSONArray("results");
                JSONObject myresult = results.getJSONObject(0);
                MyloPlace myloPlace = new MyloPlace(Locale.getDefault());
                myloPlace.setAddress(myresult.getString("formatted_address"));
                myloPlace.setFeatureName(myresult.getString("name"));
                JSONObject location = myresult.getJSONObject("geometry").getJSONObject("location");
                myloPlace.setLatitude(location.getDouble("lat"));
                myloPlace.setLongitude(location.getDouble("lng"));
                return myloPlace;
            }else{return null;}
        } catch (Exception e) {
            e.printStackTrace();
            //error case
            Log.e(TAG, "Get location address ERROR: Couldn't get Address object, send error message to wear service");
            return null;
        }
    }
}
