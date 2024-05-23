import {Component} from 'react'
import Tabs from '../Tabs'
import Images from '../Images'
import './index.css'

class MatchGame extends Component {
  state = {
    activeTabId: this.props.tabsList[0].tabId,
    imageTobeMatchedurl: this.props.imagesList[0].imageUrl,
    imageTobeMatchedId: this.props.imagesList[0].id,
    score: 0,
    isGameover: false,
    timerId: '',
    time: 60,
  }

  componentDidMount() {
    const timerId = setInterval(this.timerStart, 1000)
    this.setState({timerId: timerId})
  }

  playAgain = () => {
    const timerId = setInterval(this.timerStart, 1000)
    this.setState({
      activeTabId: this.props.tabsList[0].tabId,
      imageTobeMatchedurl: this.props.imagesList[0].imageUrl,
      imageTobeMatchedId: this.props.imagesList[0].id,
      score: 0,
      isGameover: false,
      timerId: timerId,
      time: 60,
    })
  }

  timerStart = () => {
    const {time, timerId} = this.state

    if (time === 0) {
      clearInterval(timerId)
      this.setState({isGameover: true})
    } else {
      this.setState(prevState => ({time: prevState.time - 1}))
    }
  }

  onTabChange = tabId => {
    this.setState({activeTabId: tabId})
  }

  onMatchImage = id => {
    const {imagesList} = this.props
    const num = Math.ceil(Math.random() * imagesList.length - 1)
    const randomUrl = imagesList[num].imageUrl

    const {imageTobeMatchedId, timerId, time} = this.state
    if (imageTobeMatchedId === id && time !== 0) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        imageTobeMatchedurl: randomUrl,
        imageTobeMatchedId: imagesList[num].id,
      }))
    } else {
      this.setState({isGameover: true})
      clearInterval(timerId)
    }
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, imageTobeMatchedurl, score, time, isGameover} =
      this.state

    const filteredImagesList = imagesList.filter(
      each => each.category === activeTabId,
    )
    return (
      <div className="bg">
        <nav className="nav">
          <ul className="navList">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="gamelogo"
              />
            </li>
            <li>
              <div className="score-timer">
                <p className="score">
                  Score: <span className="num">{score}</span>{' '}
                </p>
                <div className="timerCon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png "
                    alt="timer"
                    className="timerImg"
                  />
                  <p className="time">{time} sec</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        {isGameover ? (
          <div className="gameBg">
            <div className="gameoverCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                alt="trophy"
                className="trophy"
              />
              <p className="wintext">YOUR SCORE</p>
              <p className="wintext">{score}</p>
              <div>
                <button onClick={this.playAgain} className="payagainBtn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                    className="resetlogo"
                  />
                  <p className="wintext">PLAY AGAIN</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="gameBg">
            <div className="imageTobeMatchedCon">
              <img
                src={imageTobeMatchedurl}
                alt="match"
                className="imageTobeMatched"
              />
            </div>
            <div className="TabsCon">
              <ul className="tabsListCon">
                {tabsList.map(each => (
                  <Tabs
                    key={each.tabId}
                    details={each}
                    activeTabId={activeTabId}
                    onTabChange={this.onTabChange}
                  />
                ))}
              </ul>
            </div>
            <ul className="thumbnailsCon">
              {filteredImagesList.map(each => (
                <Images
                  key={each.id}
                  details={each}
                  onMatchImage={this.onMatchImage}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default MatchGame
