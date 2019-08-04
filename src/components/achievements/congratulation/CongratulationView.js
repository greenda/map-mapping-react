import React, { useEffect, useState } from 'react'
import PropTypes, { number, string } from 'prop-types'
import * as d3 from 'd3'
import './CongratulationView.scss'
import aircraftIconRed from '../../../assets/aircraft-icon__red.svg'
import achievementMagelan from '../../../assets/achievement_Magelan.svg'
import achievementAviaCroesus from '../../../assets/achievement_avia_Croesus.svg'
import achievementOurHero from '../../../assets/achievement_our_hero.svg'
import achievementGreatArmator from '../../../assets/achievement_great_armator.svg'
import achievement_achievment_hunter from '../../../assets/achievement_achievment_hunter.svg'

const WIDTH = 600
const HEIGHT = 400

export function CongratulationView({ achievement }) {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        init(isLoaded, setIsLoaded, images, achievement)
    })
    const images = {
        achievementMagelan, achievementAviaCroesus, achievementOurHero,
        achievementGreatArmator, achievement_achievment_hunter,
     }

    return (
        <div className="congratulation__container">
            <svg id="congratulation"></svg>
            <div className="congratulation__title">{achievement.title}</div>
            <div className="congratulation__description">{achievement.congratulation}</div>
        </div>
    )

}

function translateAlong(path) {
    // TODO рефакторинг
    var l = path.getTotalLength();
    return function(d, i, a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        var prevP = path.getPointAtLength(((t < 0.9 ? t : 0.9)  - 0.1) * l);
        const angle = Math.atan2(p.y - prevP.y, p.x - prevP.x) * 180 / Math.PI;
        return `rotate(${angle} ${p.x} ${p.y}) translate(${p.x - 15}, ${p.y - 15})`;
      };
    };
  }

function init(isLoaded, setIsLoaded, images, achievement) {
    if (!isLoaded) {
        const svg = d3.select('#congratulation')
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .attr('fill', 'green')

        const lines = [
            "M 300 200 L 300 20",
            "M 300 200 Q 250 70, 150 50",
            "M 300 200 Q 250 100, 100 100",
            "M 300 200 Q 200 100, 70 150",
            "M 300 200 Q 200 100, 50 200",
            "M 300 200 Q 350 70, 450 50",
            "M 300 200 Q 350 100, 500 100",
            "M 300 200 Q 400 100, 530 150",
            "M 300 200 Q 400 100, 550 200",
        ]
        svg.append("g")
            .attr("class", "congratulation__lines")
            .selectAll("path")
            .data(lines)
            .enter()
            .append("path")
            .attr('id', d => d.id)
            .attr('class', d => 'line' + d.id)
            .attr("d", d => d)
            .attr('fill', 'none')  
            .attr('stroke', 'black')

        const lineNodes = svg.select('.congratulation__lines')
            .selectAll('path').nodes()

        lineNodes
             .forEach((path) => {
                const length = path.getTotalLength()
                d3.select(path)
                  .attr('stroke-width', 4)
                  .attr('stroke-dasharray', length) 
                  .attr('stroke-dashoffset', length)
                  .attr('stroke', 'slategrey')  
                  .attr('style', 'opacity: 1')
                  .transition()
                  .duration(2000) 
                  .attr('stroke-dashoffset', 0)
                  .duration(2000) 
                  .attr('style', 'opacity: 0')
            }
        )    
        
        svg.append("g")
            .attr("class", "congratulation__aircrafts")
            .selectAll('image')
            .data(lines)
            .enter()
            .append('image')
            .attr('xlink:href', aircraftIconRed)
            .attr('width', 30)
            .attr('height', 30)
            .attr('style', 'opacity: 1')
        
        svg.select('.congratulation__aircrafts')
           .selectAll('image')
           .nodes()
           .forEach((image, index) => {
                d3.select(image)
                    .transition()
                    .duration(2000)
                    .attrTween("transform", translateAlong(lineNodes[index]))
                    .transition()
                    .duration(300)
                    .attr('style', 'opacity: 0')
           })

        svg.append('image')
            .attr('xlink:href', images[achievement.imageKey])
            .attr('x', 200)
            .attr('y', 50)

        setIsLoaded(true)
    }
}

CongratulationView.propTypes = {
    achievement: PropTypes.shape({
        id: number,
        title: string,
        imageKey: string,
        description: string,
        congratulation: string,
    }),
}

export default CongratulationView