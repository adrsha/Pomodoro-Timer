const tContainer = document.querySelector('.timer')
const sessionStarter = document.querySelector('button.starter')
const customMenu = document.querySelector('div.customMenu')
const hisTimes = document.querySelector('section.session-history').children
const futTimes = document.querySelector('section.session-future').children
let runTimer = false

let plan = document.querySelector('.plans').children
let currentState = 0
let rounds = 4
let sessions = 2
let shortBreaks = [0, 5, 0]
let longBreaks = [0, 25, 0]
let length = [0, 25, 0]
let hr = length[0]
let min = length[1]
let sec = length[2]

hisFutValChanger()
function timerValChanger(ind, timeline) {
    //0 for custom, 1 for pomo and 2 for update
    if (ind == 0) {
        rounds = document.getElementById('Rounds').innerHTML
        sessions = document.getElementById('Sessions').innerHTML
        shortBreaks = [
            document.getElementById('shortBreakhour').innerHTML,
            document.getElementById('shortBreakmin').innerHTML,
            document.getElementById('shortBreaksec').innerHTML,
        ]
        longBreaks = [
            document.getElementById('longBreakhour').innerHTML,
            document.getElementById('longBreakmin').innerHTML,
            document.getElementById('longBreaksec').innerHTML,
        ]
        length = [
            document.getElementById('Lengthhour').innerHTML,
            document.getElementById('Lengthmin').innerHTML,
            document.getElementById('Lengthsec').innerHTML,
        ]
        hr = length[0]
        min = length[1]
        sec = length[2]
        tContainer.innerHTML = hr + ':' + min + ':' + sec
    } else if (ind == 1) {
        rounds = 4
        sessions = 2
        shortBreaks = [0, 5, 0]
        longBreaks = [0, 25, 0]
        length = [0, 25, 0]
        hr = length[0]
        min = length[1]
        sec = length[2]
        tContainer.innerHTML = hr + ':' + min + ':' + sec
    }
}
function hisFutValChanger() {
    timeLine = timeLineCreator(currentState)
    for (let i = 1; i <= futTimes.length; i++) {
        if (currentState + i <= timeLineCreator().length - 1) {
            futTimes[futTimes.length - i].children[1].innerHTML =
                timeLine[currentState + i][0][0] +
                ':' +
                timeLine[currentState + i][0][1] +
                ':' +
                timeLine[currentState + i][0][2]
        } else {
            futTimes[futTimes.length - i].children[1].innerHTML = 'EMPTY'
        }
    }
    for (let i = 1; i <= hisTimes.length; i++) {
        if (currentState - i >= 0) {
            hisTimes[i - 1].children[1].innerHTML =
                timeLine[currentState - i][0][0] +
                ':' +
                timeLine[currentState - i][0][1] +
                ':' +
                timeLine[currentState - i][0][2]
        } else {
            hisTimes[i - 1].children[1].innerHTML = 'EMPTY'
        }
    }
}
function planChange(ind) {
    plan[ind].className = 'active'
    plan[Math.abs(Math.abs(ind) - 1)].className = 'inactive'
    timerValChanger(ind)
    currentState = 0
    hisFutValChanger()
}

function timeLineUpdator(modifier) {
    currentState += modifier
    if (currentState >= timeLineCreator().length) {
        hr = 0
        min = 0
        sec = 0
    } else {
        hr = timeLineCreator(currentState)[currentState][0][0]
        min = timeLineCreator(currentState)[currentState][0][1]
        sec = timeLineCreator(currentState)[currentState][0][2]
    }
    hisFutValChanger()
}

function timeLineCreator(current) {
    let shortBreakTime = [shortBreaks[0], shortBreaks[1], shortBreaks[2]]
    let longBreakTime = [longBreaks[0], longBreaks[1], longBreaks[2]]

    let focusTime = [length[0], length[1], length[2]]
    var timeLine = new Array()
    for (let j = 1; j <= sessions; j++) {
        for (let i = 5 * (j - 1) + 1; i <= rounds * 2 + 5 * (j - 1); i++) {
            if (i < current + 1) {
                if (i % 2 != 0) {
                    //odd
                    timeLine.push([focusTime, 'Focus', 1])
                } else {
                    timeLine.push([shortBreakTime, 'Break', 1])
                }
            } else if (i == current + 1) {
                if (i % 2 != 0) {
                    timeLine.push([focusTime, 'Focus', 0])
                } else {
                    timeLine.push([shortBreakTime, 'Break', 0])
                }
            } else {
                if (i % 2 != 0) {
                    timeLine.push([focusTime, 'Focus', -1])
                } else {
                    timeLine.push([shortBreakTime, 'Break', -1])
                }
            }
        }
        if (rounds * 2 * j == current) {
            timeLine.push([longBreakTime, 'Long Break', 0])
        } else if (rounds * 2 * j < current) {
            timeLine.push([longBreakTime, 'Long Break', 1])
        } else {
            timeLine.push([longBreakTime, 'Long Break', -1])
        }
    }
    return timeLine
}

function timer(runTimer) {
    sessionStarter.addEventListener('click', (e) => {
        if (runTimer) {
            runTimer = false
        } else {
            runTimer = true
        }
    })
    setInterval(() => {
        if (hr == 0 && min == 0 && sec == 0) {
            if (currentState + 1 < rounds * 2 * sessions) {
                timeLineUpdator(1)
            } else {
                runTimer = false
                currentState = 0
            }
        }
        if (runTimer) {
            sessionStarter.classList.add('inactive')
            sessionStarter.innerHTML = 'Stop'
            sessionStarter.parentNode.children[1].style.opacity = '1'
            sessionStarter.parentNode.children[1].style.transform =
                'translate(0%)'
            sessionStarter.parentNode.children[1].style.pointerEvents = 'auto'
            sessionStarter.parentNode.children[3].style.opacity = '1'
            sessionStarter.parentNode.children[3].style.transform =
                'translate(0%)'
            sessionStarter.parentNode.children[3].style.pointerEvents = 'auto'
            console.log(sessionStarter.parentNode.children)

            sec -= 1
            if (sec < 0) {
                sec = 59
                min -= 1
                if (min < 0) {
                    min = 59
                    hr -= 1
                }
            }
        } else {
            hr = length[0]
            min = length[1]
            sec = length[2]
            sessionStarter.classList.remove('inactive')
            sessionStarter.innerHTML = 'Start'
            sessionStarter.parentNode.children[1].style.opacity = '0'
            sessionStarter.parentNode.children[1].style.transform =
                'translate(100%)'
            sessionStarter.parentNode.children[1].style.pointerEvents = 'none'
            sessionStarter.parentNode.children[3].style.opacity = '0'
            sessionStarter.parentNode.children[3].style.transform =
                'translate(-100%)'
            sessionStarter.parentNode.children[3].style.pointerEvents = 'none'
        }
        tContainer.innerHTML = hr + ':' + min + ':' + sec
    }, 1000)
}
timer(runTimer)

function openCustomMenu() {
    if (customMenu.style.display == 'block') {
        customMenu.style.display = 'none'

        timerValChanger(0)
    } else {
        customMenu.style.display = 'block'
    }
}
