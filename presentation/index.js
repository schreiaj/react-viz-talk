// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#4A4A4A"
}, {primary:"#fff"});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle>
        <Deck transition={["slide"]} transitionDuration={500}>
          <Slide>
            <Heading>Three Little Circles</Heading>
            <Appear>
              <Fill>
                <svg width="100%" height="60%" viewBox="0 0 100 100">
                  <circle cx="20" cy="50" r="5" />
                  <circle cx="50" cy="50" r="5" />
                  <circle cx="80" cy="50" r="5" />
                </svg>
              </Fill>
            </Appear>
          </Slide>
          <Slide>
            <Heading>
              Code
            </Heading>
            <Fill>
              <CodePane>{`

                <svg width="100%" height="60%" viewBox="0 0 100 100">
                  <circle cx="20" cy="50" r="5" />
                  <circle cx="50" cy="50" r="5" />
                  <circle cx="80" cy="50" r="5" />
                </svg>

              `}
              </CodePane>
            </Fill>

          </Slide>

          <Slide>
            <Heading>
              Thought Process
            </Heading>
            <List>
              <Appear><ListItem>For each element in the list [20, 50, 80]</ListItem></Appear>
              <Appear><ListItem>...I want a circle</ListItem></Appear>
              <Appear><ListItem>...of radius 5</ListItem></Appear>
              <Appear><ListItem>...located at (dataValue, 50).</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Heading>
              With D3
            </Heading>
            <CodePane>{`
                let data = [20, 50, 80];
                d3.select("svg")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cy", 50)
                  .attr("r", 5)
                  .attr("cx", function(d){return d});
            `}
            </CodePane>
          </Slide>
          <Slide>
            <Heading>
              Wat?!
            </Heading>
          </Slide>
          <Slide>
            <Heading>
              Let's rethink this...
            </Heading>
            <Heading size={4}>What is the point of D3?</Heading>
            <Appear><Heading size={4}>Data Driven Documents</Heading></Appear>
            <List>
              <Appear><ListItem>The content of the document is a function of the data</ListItem></Appear>
              <Appear><ListItem>It's binding data to DOM nodes</ListItem></Appear>
              <Appear><ListItem>And handling events on them</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading size={4}>
              [SOMETHING](Data) => DOM Nodes
            </Heading>
          </Slide>
          <Slide>
            <Heading>
              Wouldn't it be nice...
            </Heading>
            <CodePane>{`
                let data = [20, 50, 80];
                <svg width="100%" height="60%" viewBox="0 0 100 100">
                data.map(function(datum){
                  <circle cx="{datum}" cy="50" r="5">
                })
                </svg>
            `}
            </CodePane>
          </Slide>
          <Slide>
            <Heading size={4}>
              Enter React
            </Heading>
            <List>
              <Appear><ListItem>Bind Data to DOM Nodes</ListItem></Appear>
              <Appear><ListItem>Shadow DOM Diffing</ListItem></Appear>
              <Appear><ListItem>JSX</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading size={4}>
              About React
            </Heading>
            <List>
              <Appear><ListItem>Component Based</ListItem></Appear>
              <Appear><ListItem>JUST view layer though</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading>
              Circle Component
            </Heading>
            <CodePane>{`
                const CircleComponent = ({data}) => (
                  <svg width="100%" height="60%" viewBox="0 0 100 100">
                  data.map(function(datum){
                    <circle cx="{datum}" cy="50" r="5">
                  })
                  </svg>
                )
              `}
            </CodePane>
          </Slide>
          <Slide>
            <Heading size={4}>
              Using in an App
            </Heading>
            <CodePane>{`
                let data = [20, 50, 80]
                ReactDOM.render(
                  <CircleComponent {data} />,
                  document.getElementById('app')
                );
            `}
            </CodePane>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
