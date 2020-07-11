import React, { Component } from "react";

class Utils {
  static getToday() {
    return new Date(Date.now()).toLocaleString();
  }

  static getUrlParam(type) {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get(type);
    return param;
  }
}

export default Utils;
