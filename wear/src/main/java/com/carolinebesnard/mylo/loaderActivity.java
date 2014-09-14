package com.carolinebesnard.mylo;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.support.wearable.view.CircledImageView;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.carolinebesnard.mylo.R;
import com.google.android.gms.common.api.GoogleApiClient;

/**
 * Created by carolinebesnard on 22/07/2014.
 */
public class loaderActivity extends Activity{

    private CircledImageView endLoader;
    private GoogleApiClient mGoogleApiClient;
    private AnimatedView animatedview;
    private LinearLayout container;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //super.onCreate(savedInstanceState);

        TextView titleview = new TextView(this);
        titleview.setText("Quick Add");
        titleview.setTextColor(Color.BLACK);
        titleview.setTextSize(26);
        titleview.setTypeface(Typeface.create("sans-serif-light", Typeface.NORMAL));
        titleview.setGravity(Gravity.CENTER_HORIZONTAL);

        animatedview = new AnimatedView(this);
        animatedview.startAnimating(0f,360f);
        //animatedview.setVisibility(View.INVISIBLE);

        endLoader = new CircledImageView(this);
        endLoader.setImageResource(R.drawable.android_wear_loader_end);
        endLoader.setCircleRadius(150);
        endLoader.setVisibility(View.INVISIBLE);

        container = new LinearLayout(this);
        container.setBackgroundColor(Color.WHITE);
        container.setOrientation(LinearLayout.VERTICAL);

        container.addView(titleview);
        container.addView(animatedview);
        //container.addView(endLoader);
        setContentView(container);

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                animatedview.doneLoading=true;
            }
        }, 10000);

    }
}
