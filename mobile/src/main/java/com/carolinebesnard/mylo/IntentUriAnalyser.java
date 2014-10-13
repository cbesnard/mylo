package com.carolinebesnard.mylo;

import android.content.Context;
import android.location.Address;
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
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

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
                    String addr = Helper.getAddrFromGPS(lat, lon);
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
                        //LatLng gps = getGPSFromAddr(value);
                        Address addr = Helper.getAddressObject(value);
                        if(addr!=null) {
                            LatLng gps = new LatLng(addr.getLatitude(), addr.getLongitude());
                            if (addr.getFeatureName() != null) {
                                name = addr.getFeatureName();
                            }
                            if (gps != null) {
                                String convertedName = null;
                                String convertedAddr = null;
                                try {
                                    convertedName = Base64.encodeToString(name.getBytes("UTF-8"), Base64.DEFAULT);
                                    convertedAddr = Base64.encodeToString(address.getBytes("UTF-8"), Base64.DEFAULT);
                                } catch (UnsupportedEncodingException e) {
                                    e.printStackTrace();
                                }
                                String url = "javascript:addPublicPlaceFromLink('" + convertedName + "','" + convertedAddr + "'," + gps.latitude + "," + gps.longitude + ")";
                                return url;
                            } else {return null;}
                        }else {return null;}
                    }else {return null;}
                }
            }else {
                value = data.getQueryParameter("cid");
                if(value!=null){
                    // TODO: ASK PLACES API WITH CID
                    return null;
                }else{
                    // UNKNOWN URL FORMAT
                    return null;
                }
            }
        } else if (host.equals("goo.gl")) {
            Log.i(TAG,data.toString());
            try{
                //HTTP REQUEST TO GET LONG URL
                String URL = "https://www.googleapis.com/urlshortener/v1/url?shortUrl="+data.toString();
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
                    // TODO: ASK PLACES API WITH CID
                } else{
                    //Closes the connection.
                    response.getEntity().getContent().close();
                }
            }catch (Exception e){}
        }
        return null;
    }


}
