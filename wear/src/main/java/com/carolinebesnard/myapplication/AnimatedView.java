package com.carolinebesnard.myapplication;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.Rect;
import android.graphics.RectF;
import android.util.Log;
import android.view.View;

import static com.carolinebesnard.myapplication.R.drawable.android_wear_loader_end;

/**
 * Created by carolinebesnard on 18/07/2014.
 */
public class AnimatedView extends View implements ValueAnimator.AnimatorUpdateListener {
    private Paint paint;
    public ValueAnimator valueAnimator;
    private Float value;
    private Float angleStart;
    private Boolean cycleState; //0=completing / 1=emptying
    public static Boolean doneLoading;
    public static Boolean success;

    public AnimatedView(Context context) {
        super(context);

        paint = new Paint();
        paint.setColor(Color.rgb(47, 186, 144));
        paint.setStrokeWidth(10);
        paint.setStyle(Paint.Style.STROKE);
        paint.setAntiAlias(true);

        angleStart = -90f;
        cycleState = false;
        doneLoading=false;
        success=false;
        this.setBackgroundResource(R.drawable.android_wear_loader_end);
    }

    @Override
    public void draw(Canvas canvas){
        canvas.drawColor(Color.WHITE);

        Paint whitePaint = new Paint();
        whitePaint.setColor(Color.WHITE);
        whitePaint.setAntiAlias(true);
        Float width = Float.valueOf(canvas.getWidth());
        Float height = Float.valueOf(canvas.getHeight());
        //
        Float circleSize = 150f;
        //
        RectF boundingBox = new RectF((width-circleSize)/2,(height-circleSize)/2,(width-circleSize)/2+circleSize,(height-circleSize)/2+circleSize);
        //canvas.drawCircle(100,100,100,whitePaint);
        canvas.drawArc(boundingBox,0,360,false,whitePaint);
        Log.i("on draw called: value=", value.toString()+"cycleState="+cycleState.toString());
        if(cycleState){//emptying
           value=value-360;
            if(Math.abs(value)>360f){value=-360f;}
        }

        canvas.drawArc(boundingBox,angleStart,value,false,paint);
        //canvas.drawCircle(100,100,90,whitePaint);
        //Log.i("on draw called", "i");
    }

    public void startAnimating(Float startBound, Float endBound) {
        angleStart = -90f;
        //valueAnimator = ValueAnimator.ofInt(0, 360);
        valueAnimator = ValueAnimator.ofFloat(startBound, endBound);
        valueAnimator.setDuration(1000);
        valueAnimator.addUpdateListener(this);
        valueAnimator.addListener(new AnimatorListenerAdapter()
        {
            @Override
            public void onAnimationEnd(Animator animation)
            {
                if(!doneLoading){
                    cycleState=!cycleState;
                    startAnimating(0f,360f);
                }/*else {
                    if(success){

                    }
                }*/
            }
        });
        //valueAnimator.setRepeatCount(ValueAnimator.INFINITE);
        //valueAnimator.setRepeatMode(ValueAnimator.RESTART);
        valueAnimator.start();
    }

    @Override
    public void onAnimationUpdate(ValueAnimator animation) {
        value = (Float) animation.getAnimatedValue();
        //Float value = (Float) animation.getAnimatedValue();
        /*if(cycleState){//emptying
            if(value<0.6f){
                cycleState=!cycleState;
            }//else{this.invalidate();}
        }else{//completing
            if(value>358f){
                cycleState=!cycleState;
            }//else{this.invalidate();}
        }*/
        Long t = animation.getCurrentPlayTime();
        this.invalidate();
        //Log.i("on onAnimationUpdate called", "value="+value.toString()+" anglestart="+angleStart+" angleEnd="+angleEnd);
    }
}
