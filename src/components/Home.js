import React from "react";
import classes from "./Home.module.css";
import { BsPlayCircle } from "react-icons/bs";

const Home = () => {
  return (
    <>
      <div className={classes.topmost}>
        <div className={classes.playText}>
          <p>Get Our Latest Album</p>
        </div>
        <div className={classes.playBtn}>
          <BsPlayCircle />
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.heading}>TOURS</div>
        <div>
          <div className={classes.outer}>
            <div className={classes.date}>JUL16</div>
            <div className={classes.place}>DETROIT, MI</div>
            <div className={classes.title}>DTE ENERGY MUSIC THEATRE</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
          <div className={classes.outer}>
            <div className={classes.date}>JUL19</div>
            <div className={classes.place}>TORONTO,ON</div>
            <div className={classes.title}>BUDWEISER STAGE</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
          <div className={classes.outer}>
            <div className={classes.date}>JUL 22</div>
            <div className={classes.place}>BRISTOW, VA</div>
            <div className={classes.title}>JIGGY LUBE LIVE</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
          <div className={classes.outer}>
            <div className={classes.date}>JUL 29</div>
            <div className={classes.place}>PHOENIX, AZ</div>
            <div className={classes.title}>AK-CHIN PAVILION</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
          <div className={classes.outer}>
            <div className={classes.date}>AUG 2</div>
            <div className={classes.place}>LAS VEGAS, NV</div>
            <div className={classes.title}>T-MOBILE ARENA</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
          <div className={classes.outer}>
            <div className={classes.date}>AUG 7</div>
            <div className={classes.place}>CONCORD, CA</div>
            <div className={classes.title}>CONCORD PAVILION</div>
            <button className={classes.buyBtn}>BUY TICKETS</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
