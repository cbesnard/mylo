package com.carolinebesnard.mylo;

import android.content.Context;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;

/**
 * Created by carolinebesnard on 21/09/2014.
 */
public class LocationHandler implements GoogleApiClient.ConnectionCallbacks,GoogleApiClient.OnConnectionFailedListener,LocationListener {

    private static final int TWO_MINUTES = 1000 * 60 * 2;
    private static final long updateInterval=120000;//in milliseconds
    private static final long debugUpdateInterval=1000;//in milliseconds
    private final static int CONNECTION_FAILURE_RESOLUTION_REQUEST = 9000;

    private LocationClient locationclient;
    private LocationRequest locationrequest;
    private GoogleApiClient mGoogleApiClient;
    private LocationListener myLocationListener;

    public Context applicationContext;
    public LocationUpdateListener myListener;

    public Location currentLocation;

    private static final String TAG = LocationHandler.class.getSimpleName();

    //TO DO : check all possible source of error and prevent it

    public LocationHandler(Context context, LocationUpdateListener listener){
        Log.i(TAG,"Consructor called");
        applicationContext = context;
        myListener = listener;
        /*
        * CHECK GOOGLE API CLIENT
        */
        mGoogleApiClient = new GoogleApiClient.Builder(context)
                .addApi(LocationServices.API)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();
        mGoogleApiClient.connect();
    }

    public void disconnectMyLocationClient() {
        mGoogleApiClient.disconnect();
    }

    public Location getLocation() {
        Log.i(TAG, "getLocation called");
        if(mGoogleApiClient == null){
            Log.e(TAG, "ERROR mGoogleApiClient is null");
            return null;
        }
        Location loc = LocationServices.FusedLocationApi.getLastLocation(mGoogleApiClient);
        if(loc!=null){
            Log.i(TAG, "Last Known Location :" + loc.getLatitude() + "," + loc.getLongitude());
        }else{
            Log.i(TAG, "Last Known Location is null");
        }
        return loc;
    }

    public int startLocationRequest() {

        if(mGoogleApiClient == null){
            Log.e(TAG, "ERROR mGoogleApiClient is null");
            return 0;
        }
        locationrequest = LocationRequest.create();
        locationrequest.setInterval(debugUpdateInterval);
        locationrequest.setFastestInterval(debugUpdateInterval);
        LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient,locationrequest, this);
        return 1;
    }

    public void stopLocationRequest() {
        LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient,this);
    }

    @Override
    public void onLocationChanged(Location location) {
        Log.i(TAG, "Location Request - on location changed :" + location.getLatitude() + "," + location.getLongitude());
        if(location!=null){
            if(currentLocation !=null){
                if(isBetterLocation(location,currentLocation)){
                    Log.v(TAG, "new best location: lat="+location.getLatitude()+"lon="+location.getLongitude());
                    currentLocation=location;
                }
            }else{
                currentLocation = location;
            }
            if(myListener!=null){
                myListener.onLocationUpdate(currentLocation);
            }
        }
    }

    @Override
    public void onConnected(Bundle connectionHint) {
        Log.i(TAG, "onConnected");
        if(myListener!=null){
            startLocationRequest();
        }
    }

    @Override
    public void onConnectionSuspended(int i) {
        Log.i(TAG, "onConnectionSuspended");
        if(myListener!=null){
            stopLocationRequest();
        }
    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {
        /*
         * Google Play services can resolve some errors it detects.
         * If the error has a resolution, try sending an Intent to
         * start a Google Play services activity that can resolve
         * error.
         */
        /*if (connectionResult.hasResolution()) {
            try {

                // Start an Activity that tries to resolve the error
                connectionResult.startResolutionForResult(mainActivityInstance,CONNECTION_FAILURE_RESOLUTION_REQUEST);
                //Thrown if Google Play services canceled the original PendingIntent
            } catch (IntentSender.SendIntentException e) {
                // Log the error
                e.printStackTrace();
            }
        } else {
            //If no resolution is available, display a dialog to the user with the error.
            //showErrorDialog(connectionResult.getErrorCode());
        }*/
    }

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
}
