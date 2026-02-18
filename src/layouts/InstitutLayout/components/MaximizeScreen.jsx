"use client"

import { useState } from "react"
import { Button, Tooltip } from "antd"
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons"

const MaximizeScreen = () => {
  const [fullScreenOn, setFullScreenOn] = useState(false)

  const toggleFullScreen = () => {
    const document = window.document

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
      }
      setFullScreenOn(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      setFullScreenOn(false)
    }

    // handle fullscreen exit
    const exitHandler = () => {
      if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        setFullScreenOn(false)
      }
    }

    document.addEventListener("fullscreenchange", exitHandler)
    document.addEventListener("webkitfullscreenchange", exitHandler)
    document.addEventListener("mozfullscreenchange", exitHandler)
  }

  return (
    <Tooltip title={fullScreenOn ? "Quitter le plein écran" : "Plein écran"}>
      <Button
        type="text"
        icon={fullScreenOn ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        onClick={toggleFullScreen}
        size="large"
        shape="circle"
      />
    </Tooltip>
  )
}

export default MaximizeScreen
