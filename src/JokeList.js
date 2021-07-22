import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet : 10
  };

  state = { jokes: [] }

  setJokes = (j) => {
    this.setState({jokes: j});
  }

 /* at mount, get jokes */

 componentDidMount() {
  if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
}

componentDidUpdate() {
  if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
}

/* retrieve jokes from API */

async getJokes() {
  try {
    // load jokes one at a time, adding not-yet-seen jokes
    let jokes = this.state.jokes;
    let jokeVotes = JSON.parse(
      window.localStorage.getItem("jokeVotes") || "{}"
    );
    let seenJokes = new Set(jokes.map(j => j.id));

    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" }
      });
      let { status, ...joke } = res.data;

      if (!seenJokes.has(joke.id)) {
        seenJokes.add(joke.id);
        jokeVotes[joke.id] = jokeVotes[joke.id] || 0;
        jokes.push({ ...joke, votes: jokeVotes[joke.id], locked: false });
      } else {
        console.log("duplicate found!");
      }
    }

    this.setState({ jokes });
  } catch (e) {
    console.log(e);
  }
}

  /* empty joke list and then call getJokes */

  generateNewJokes = () => {
    this.setJokes([]);
  }

  /* change vote for this id by delta (+1 or -1) */

  vote = (id, delta) => {
    this.setJokes(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }

  /* render: either loading spinner or list of sorted jokes. */
  render() {
    const {jokes} = this.state;
    if (jokes.length) {
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>
  
        {sortedJokes.map(j => (
          <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
        ))}
      </div>
    );
  }
  return null;
}
}

export default JokeList;