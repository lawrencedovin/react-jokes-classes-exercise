import React from "react";
import "./Joke.css";

class Joke extends React.Component{

  state = { votes: 0 }

  upVote = () => {
    this.setState({votes: this.state.votes + 1});
  }

  downVote = () => {
    this.setState({votes: this.state.votes - 1});
  }

  render() {
    const {vote, text, id} = this.props;
    const {votes} = this.state;

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>
          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    )
  }
}

export default Joke;



// import React from "react";
// import "./Joke.css";

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

// export default Joke;
