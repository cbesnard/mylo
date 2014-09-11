package com.carolinebesnard.myapplication;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.support.wearable.view.CircledImageView;
import android.support.wearable.view.WatchViewStub;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.wearable.MessageApi;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.NodeApi;
import com.google.android.gms.wearable.Wearable;

import java.util.List;

public class MyActivity extends Activity {

    private TextView titleview;
    //private ImageButton addButton;
    //public static Boolean deviceIsConnected;
    private CircledImageView addButton;
    public CircledImageView endLoader;
    public TextView errorTxtView;
    private GoogleApiClient mGoogleApiClient;
    public AnimatedView animatedview;
    public LinearLayout container;
    private Context context;
    private static final String TAG = MyActivity.class.getSimpleName();
    public static final String OutOfReachErrorString = "Sorry, your phone is out of reach verify your bluetooth and try again :)";
    public static final String AddLocErrorString = "Sorry, your position couldn't be found!\nTry again later :)";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //MyloWearServiceListener.activity=this;
        Log.i(TAG,"onCreate called");
        context = this;
        //deviceIsConnected = true;
        //View view = this.getWindow().getDecorView();
        //view.setBackgroundColor(Color.GREEN);
        titleview = new TextView(this);
        titleview.setText("Quick Add");
        titleview.setTextColor(Color.BLACK);
        titleview.setTextSize(26);
        titleview.setTypeface(Typeface.create("sans-serif-light", Typeface.NORMAL));
        titleview.setPadding(0, 0, 0, 0);// llp.setPadding(left, top, right, bottom);
        LinearLayout.LayoutParams llp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        llp.setMargins(0, 20, 0, 0); // llp.setMargins(left, top, right, bottom);
        llp.gravity= Gravity.CENTER_HORIZONTAL;
        titleview.setLayoutParams(llp);
        titleview.setGravity(Gravity.CENTER_HORIZONTAL);

        addButton = new CircledImageView(this);
        addButton.setImageResource(R.drawable.android_wear_addbutton);
        addButton.setCircleRadius(120);
        addButton.setPadding(0, 0, 0, 0);// llp.setPadding(left, top, right, bottom);
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("in on click","add button clicked");
                onButtonClicked();
            }
        });

        animatedview = new AnimatedView(this);
        //animatedview.startAnimating(0f,360f);
        animatedview.setVisibility(View.INVISIBLE);

        endLoader = new CircledImageView(this);
        endLoader.setImageResource(R.drawable.android_wear_loader_end);
        endLoader.setCircleRadius(150);
        endLoader.setVisibility(View.INVISIBLE);

        errorTxtView = new TextView(this);
        errorTxtView.setText(AddLocErrorString);
        errorTxtView.setTextColor(Color.GRAY);
        errorTxtView.setTextSize(18);
        errorTxtView.setTypeface(Typeface.create("sans-serif-light", Typeface.NORMAL));
        //errorTxtView.setGravity(Gravity.CENTER_HORIZONTAL);
        errorTxtView.setGravity(Gravity.CENTER);
        errorTxtView.setVisibility(View.INVISIBLE);

        container = new LinearLayout(this);
        container.setBackgroundColor(Color.WHITE);
        container.setOrientation(LinearLayout.VERTICAL);

        container.addView(titleview);
        container.addView(addButton);
        container.addView(animatedview);
        container.addView(endLoader);
        container.addView(errorTxtView);
        setContentView(container);

        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(Wearable.API)
                .build();
        mGoogleApiClient.connect();
    }
    @Override
    protected void onResume(){
        super.onResume();
        Log.i(TAG,"onResume called");
        MyloWearServiceListener.activity = this;
    }
    @Override
    protected void onPause(){
        super.onPause();
        Log.i(TAG,"onPause called");
        MyloWearServiceListener.activity = null;
    }
    @Override
    protected void onStop(){
        Log.i(TAG,"onStop called");
        super.onStop();
        MyloWearServiceListener.activity = null;
    }

    public void endOfLoad(){
        animatedview.setVisibility(View.GONE);
        endLoader.setVisibility(View.VISIBLE);
        //
        Handler h = new Handler();
        h.postDelayed(new Runnable(){

            @Override
            public void run() {
                endLoader.setVisibility(View.GONE);
                addButton.setVisibility(View.VISIBLE);
            }
        },1000);
    }

    public void addErrorDisplay(String message){
        titleview.setVisibility(View.VISIBLE);
        addButton.setVisibility(View.GONE);
        animatedview.setVisibility(View.GONE);
        endLoader.setVisibility(View.GONE);
        errorTxtView.setText("\n"+message);
        errorTxtView.setVisibility(View.VISIBLE);
        //
        Log.i(TAG, "In addErrorDisplay method");
        Handler h = new Handler();
        h.postDelayed(new Runnable(){

            @Override
            public void run() {
                Log.i(TAG, "End of response display: back to add button");
                errorTxtView.setVisibility(View.GONE);
                addButton.setVisibility(View.VISIBLE);
            }
        },2500);
    }

    public void onButtonClicked() {
        Log.i("in onButtonClicked","youhou");
        try{
            if(mGoogleApiClient == null){
                return;
            }
            Log.i(TAG,"mGoogleApiClient="+mGoogleApiClient.toString());
            //launch loader
            addButton.setVisibility(View.GONE);
            animatedview.doneLoading=false;
            animatedview.setVisibility(View.VISIBLE);
            animatedview.startAnimating(0f,360f);

            //if(deviceIsConnected==true){
                //Log.i(TAG,"deviceIsConnected="+deviceIsConnected);
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Log.i(TAG, "in new thread run method");
                        NodeApi.GetConnectedNodesResult nodes = Wearable.NodeApi.getConnectedNodes(mGoogleApiClient).await();

                        Log.i(TAG, "nodes.getNodes().isEmpty()="+nodes.getNodes().isEmpty());

                        if(nodes.getNodes().isEmpty()){
                            // Log an error : No device over bluetooth
                            Log.i(TAG, "MESSAGE ERROR: failed to send Message");
                            //addErrorDisplay();
                            MyloWearServiceListener.activity.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    MyloWearServiceListener.activity.addErrorDisplay(OutOfReachErrorString);
                                }
                            });
                        }
                        else { //device over bluetooth
                            for (Node node : nodes.getNodes()) {
                                MessageApi.SendMessageResult result = Wearable.MessageApi.sendMessage(mGoogleApiClient, node.getId(), "/MESSAGE", null).await();
                                if (result.getStatus().isSuccess()) {
                                    Log.i(TAG, "Message sent to handle device ");
                                }
                                else {
                                    // Log an error
                                    Log.i(TAG, "MESSAGE ERROR: failed to send Message");
                                    //addErrorDisplay();
                                    MyloWearServiceListener.activity.runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            MyloWearServiceListener.activity.addErrorDisplay(OutOfReachErrorString);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }).start();

                Wearable.MessageApi.sendMessage(mGoogleApiClient, "", "/MESSAGE", null);

            //}else {
            //    Log.i(TAG,"Error: device is out of reach");
            //    addErrorDisplay();
            //}

        } catch(Exception e) { // or your specific exception
            Log.i(TAG,"Exception catched: "+e.getMessage());
            addErrorDisplay(OutOfReachErrorString);
        }
    }
}
