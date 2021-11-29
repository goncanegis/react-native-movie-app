import React, { useRef } from 'react'

import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

import { StyleSheet, Dimensions, Button } from 'react-native'

const { width, height } = Dimensions.get('window')

export const VideoPlayer = ({ source }) => {
  const videoRef = useRef(null)

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        await ScreenOrientation.unlockAsync()
        break
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        )
        break
    }
  }

  const showVideoInFullscreen = async () => {
    await videoRef.current.presentFullscreenPlayer()
  }

  ;<Button title='Play video' onPress={showVideoInFullscreen} />

  return (
    <Video
      ref={videoRef}
      style={styles.video}
      source={source}
      useNativeControls
      resizeMode='contain'
      isLooping={false}
      useNativeControls={true}
      onFullscreenUpdate={onFullscreenUpdate}
    />
  )
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: width,
    height: height / 3,
  },
})
