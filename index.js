const $score = document.getElementById('score')
let points = 0
const levels = 15
let keys = getKeysPattern(levels)
nextLevel(0)

function nextLevel(actLevel) {
  if(actLevel == levels) {
    return swal({
      title: 'You won!',
      icon: 'success',
      button: 'Next'
    })
  }

  if(actLevel == 0) {
    swal({
      title: 'Welcome!',
      text: `First level`,
      icon: 'success',
      button: 'Next'
    })
  } else {
    swal({
      title: 'Good job!',
      text: `Next level: ${actLevel + 1}`,
      icon: 'success',
      button: 'Next'
    })
  }

  for(let i = 0; i <= actLevel; i++) {
    setTimeout(() => {
      activate(keys[i])
    }, (i+1) * 1000 + 1000)
  }

  let i = 0
  let actKey = keys[i]

  window.addEventListener('keydown', onKeyDown)

  function onKeyDown(e) {
    if(e.keyCode == actKey) {
      activate(actKey, {success: true})
      i++
      points++

      if (i > actLevel) {
        window.removeEventListener('keydown', onKeyDown)
        
        setTimeout(() => {
          nextLevel(i)
        }, 1200)
      }

      actKey = keys[i]
    } else {
      activate(e.keyCode, {fail: true})
      points--

      if(points == -1) {
        window.removeEventListener('keydown', onKeyDown)

        swal({
          title: 'You lose :(',
          icon: 'error',
          buttons: 'Play again?',
          buttons: ['No >:\'(', 'Sure >:)']
        })
        .then(value => {
          if(value) {
            keys = getKeysPattern()
            nextLevel(0)
          }
        })
      }
    }

    $score.textContent = points
  }
}


function getKeysPattern(levels) {
  return new Array(levels).fill(0).map(getRandomKey)
}

function getRandomKey() {
  const max = 90
  const min = 65
  return Math.floor(Math.random() * (max-min)) + min
}

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')

  if(opts.success) {
    el.classList.add('success')
  } else if(opts.fail) {
    el.classList.add('fail')
  }

  setTimeout(() => {
    deactivate(el) 
  }, 700)
}

function deactivate(el) {
  el.className = 'key'
}
