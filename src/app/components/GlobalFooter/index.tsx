"use client";
import React from "react";
import './index.css'

//搜索条

export default function GlobalFooter() {
  const currentYeal = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYeal} 面试刷题平台</div>
      <a href="www.hongmofang.top" target="_blank">
          作者：红模仿
      </a>
    </div>
  );
}
