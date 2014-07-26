soundbank-slice
===

Use with soundbank-inherit to slice an audio sample across the desired amount of audio-slots.

Use as a value provider in [soundbank](https://github.com/mmckegg/soundbank).

## Install

```bash
$ npm install soundbank-slice
```

## Example

```js
var Soundbank = require('soundbank')
var audioContext = new AudioContext()

audioContext.providers = {
  inherit: require('soundbank-inherit'),
  slice: require('soundbank-slice')
}

audioContext.sources = {
  sample: require('soundbank-sample')
}

audioContext.sampleCache = {}
loadBuffer('/samples/hiss.wav', function(err, buffer){
  audioContext.sampleCache['hiss.wav'] = buffer
})

var soundbank = Soundbank(audioContext)
soundbank.connect(audioContext.destination)

// configure the original slot
soundbank.update({
  id: 'slice0',
  sources: [
    { node: 'sample',
      url: 'hiss.wav',
      offset: {
        node: 'slice',
        trim: [0, 1],
        steps: 4
      }
    }
  ],
  offset: 0 // will playback from 0 to 0.25
})

// inherit from original
soundbank.update({
  id: 'slice1',
  node: 'inherit', // use inherit provider
  from: 'slice0',
  offset: 1 // will playback from 0.25 to 0.5
})
soundbank.update({
  id: 'slice2',
  node: 'inherit',
  from: 'sound0',
  offset: 2 // will playback from 0.5 to 0.75
})

// now if any changes are made to the original slot, they will also be applied to any slots that inherit from it
```