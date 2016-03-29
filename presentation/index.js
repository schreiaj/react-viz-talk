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

const d3 = require("d3");

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};


const CircleComponent = ({data}) => (
  <svg width="100%" height="60%" viewBox="0 0 100 100">
  {data.map(function(datum, i){
    return <circle key={i} cx={datum} cy="50" r="5" />
  })}
  </svg>
)


const RiskAsterComponent = ({data}) => {

  let pie = d3.layout.pie().padAngle(0.03).value((d) => d.weight)
  let arc = d3.svg.arc().innerRadius(200).outerRadius(250).cornerRadius(5)
  let radiusScale = d3.scale.linear().domain([0,1]).range([75, 175]).clamp(true)
  let innerArc = d3.svg.arc().innerRadius(50).outerRadius(function(datum){return radiusScale(datum.data.val);}).cornerRadius(5)

  return (<svg width="60%" height="60%" viewBox="0 0 600 600">
    <g transform="translate(300, 300)" >
      {
        pie(data).map(function(datum, i){
        return (<g key={i}>
          <path id={datum.name} d={arc(datum)}/>
          <path d={innerArc(datum)} />
          </g>)
      })
      }
    </g>
  </svg>)
}

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
                {data.map(function(datum, i){
                  return <circle key={i} cx={datum} cy="50" r="5" />
                })}
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
          <Slide>
            <CircleComponent data={[20, 50, 80]} />
          </Slide>
          <Slide>
            <Heading size={4} >
              How can I use this - JSBin?
            </Heading>
            <CodePane>{`
              <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"></script>
            `}</CodePane>
          </Slide>
          <Slide>
            <Heading size={4}>
              In Rails
            </Heading>
            React-Rails Gem
            <br />
            - OR -
            <br />
            Add the JS files to your application and include them.
          </Slide>
          <Slide>
            <Heading size={4}>Basically...</Heading>
            Add the JS files and render the component. You just need ES6 transpiler for nice syntax
          </Slide>
          <Slide>
            <Heading size={4}>
              But D3 makes math easy...
            </Heading>
            <Appear>
              <Heading size={5}>Then use D3 for that!</Heading>
            </Appear>
          </Slide>
          <Slide>
            <Heading size={4}>
              Ok, but we're OHS...
            </Heading>
            <Appear>
              <Heading size={4}> What's this have to do with Healthcare?</Heading>
            </Appear>

            <Appear>
              <Heading size={4}> Let's recreate some other visuals...</Heading>
            </Appear>

          </Slide>

          <Slide>
            <Heading size={4}>
              IE Risk Plot
            </Heading>
            <RiskAsterComponent data={[{name:'foo', val:0.2, weight:1}, {name:'bar', val:0.6, weight:1}, {name:'bat', val:1, weight:2}]} />
          </Slide>
          <Slide>
            <CodePane>{`
              const RiskAsterComponent = ({data}) => {

                let pie = d3.layout.pie().padAngle(0.03).value((d) => d.weight)
                let arc = d3.svg.arc().innerRadius(200).outerRadius(250).cornerRadius(5)
                let radiusScale = d3.scale.linear().domain([0,1]).range([75, 175]).clamp(true)
                let innerArc = d3.svg.arc().innerRadius(50).outerRadius(function(datum){return radiusScale(datum.data.val);}).cornerRadius(5)

                return (<svg width="60%" height="60%" viewBox="0 0 600 600">
                  <g transform="translate(300, 300)" >
                    {
                      pie(data).map(function(datum, i){
                      return (<g key={i}>
                        <path id={datum.name} d={arc(datum)}/>
                        <path d={innerArc(datum)} />
                        </g>)
                    })
                    }
                  </g>
                </svg>)
              }
            `}

            </CodePane>
          </Slide>
          <Slide>
            <Heading size={4}>No Free Lunch</Heading>
            <List>
              <Appear><ListItem>Out of box no nice transitions</ListItem></Appear>
              <Appear><ListItem>May be a performance bear</ListItem></Appear>
              <Appear><ListItem>Lots of extra D3 cruft</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading size={4}>Upsides</Heading>
              <List>
                <Appear><ListItem>Fewer mental gymnastics</ListItem></Appear>
                <Appear><ListItem>Easier to debug</ListItem></Appear>
                <Appear><ListItem>More reusable</ListItem></Appear>
              </List>
          </Slide>
          <Slide>
            <Heading size={4}>Ok, that's great, but I just need a bar chart</Heading>
            <Appear><Heading size={4}>Enter Victory.JS</Heading></Appear>
          </Slide>
          <Slide>
            <Heading>VictoryJS</Heading>
            <Appear><BlockQuote>An ecosystem of modular data visualization components for React.</BlockQuote></Appear>
          </Slide>
          <Slide>
            <Heading size={4}>What's Included</Heading>
            <List>
              <ListItem>Line Chart</ListItem>
              <ListItem>Pie/Donut Chart</ListItem>
              <ListItem>Scatter Plots</ListItem>
              <ListItem>Axis</ListItem>
              <ListItem>Labels</ListItem>
              <ListItem>More being added</ListItem>
            </List>
          </Slide>
          <Slide>
            <a target="_blank" href="http://victory.formidable.com">http://victory.formidable.com</a>
          </Slide>
          <Slide>
            <Heading size={4}>Ok, that's cool, but I'm confused</Heading>
          </Slide>
          <Slide>
            <Heading>Use D3/React If...</Heading>
            <List>
              <ListItem>You're prototyping to see how something looks with data</ListItem>
              <ListItem>You don't need a ton of animation</ListItem>
              <ListItem>You understand the React lifecycle hooks and can add animation</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading>Use VictoryJS If...</Heading>
            <List>
              <ListItem>You just want a line chart</ListItem>
              <ListItem>You have data that will change a ton and don't want to mess with React</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={4}>But I hate JS frameworks</Heading>
          </Slide>
          <Slide>
            <Heading size={4}>Then only use React where you want the visualization</Heading>
            <Appear><Heading size={5}>Seriously, it's that modular</Heading></Appear>
          </Slide>
          <Slide>
            <Heading size={4}>TL;DR</Heading>
            <List>
              <Appear><ListItem>D3 is a cognitive mismatch for designers</ListItem></Appear>
              <Appear><ListItem>React is pretty cool and pretty modular</ListItem></Appear>
              <Appear><ListItem>VictoryJS is good for basic stuff</ListItem></Appear>
              <Appear><ListItem>This is a hot topic of data visualization, things are moving quick</ListItem></Appear>
              <Appear><ListItem>Use React where you need it, ignore it otherwise</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading>Questions?</Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
