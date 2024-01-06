import React, { useState } from "react";
import { config, useSpring, animated } from "@react-spring/three"
import { Html, Text } from "@react-three/drei";
import * as THREE from 'three'
import styled from 'styled-components';
import elements from "./constants/elements";
import Quadrilateral from "./Quadrilateral";
import FocusFrame from "./FocusFrame";
import convert from 'color-convert';

import './App.css';

const Elements = (props) => {

    return (
        <>
            {[...Array(118)].map((_, i) => {
                return (
                    <Element {...props}
                        key={i}
                        atomicNumber={elements[(i + 1).toString()].atomicNumber}
                        emissive={new THREE.Color('#000000')}
                        count={props.count}
                    />
                )
            })}
        </>
    )
}

const Element = ({ size = 0.4, radius = 0, color = '#000000', opacity = 1, ...props }) => {

    const RADIUS_P = 2.0
    const RADIUS_D = 2.4
    const RADIUS_F = 3.6
    const element = elements[props.atomicNumber.toString()]

    const [hovered, setHovered] = useState(false);
    const [bubbleHovered, setBubbleHovered] = useState(false);
    const cardWidth = 0.8
    const cardHeight = 0.8

    const { transitionParameter } = useSpring({
        transitionParameter: props.count,
        config: { ...config.wobbly, duration: 2000 },
    });

    const getColor = () => {
        let max = 0
        let min
        let weight
        let h
        let s
        let v
        switch (props.characteristicCount % props.numberOfCharacteristics) {
            case 0:
                color = element.orbit.slice(-1) === 's' ?
                    '#8888FF' :
                    element.orbit.slice(-1) === 'p' ?
                        '#88FF88' :
                        element.orbit.slice(-1) === 'd' ?
                            '#FF8888' :
                            '#FF66FF'
                break
            case 1:
                max = 2372
                min = 370
                weight = -(element['1stIonizationEnergy'] - min) / (max - min) + 1
                h = Math.pow(weight, 2) * 120 + 240
                s = Math.pow(weight, 4) * 100
                v = Math.pow(weight, 2) * 100
                color = '#' + convert.hsv.hex(h, s, v)
                break
            case 2:
                max = 349
                min = -116
                weight = (element['electronAffinity'] - min) / (max - min)
                h = -Math.pow(weight, 2) * 120 + 360
                s = Math.pow(weight, 0.4) * 100
                v = Math.pow(weight, 0.6) * 100
                color = '#' + convert.hsv.hex(h, s, v)
                break
            case 3:
                max = 5930
                min = -270
                weight = -(element['boilingPoint'] - min) / (max - min) + 1
                h = Math.pow(weight, 4) * 90 + 90
                s = Math.pow(weight, 1) * 100
                v = Math.pow(weight, 0.7) * 100
                color = '#' + convert.hsv.hex(h, s, v)
                break
            case 4:
                max = 4300
                min = -273
                weight = -(element['meltingPoint'] - min) / (max - min) + 1
                h = Math.pow(weight, 4) * 90 + 30
                s = Math.pow(weight, 1) * 100
                v = Math.pow(weight, 0.7) * 100
                color = '#' + convert.hsv.hex(h, s, v)
                break

            default:
        }
        return color
    }
    const getOpacity = () => {
        const DEFAULT_OPACITY = 0.7
        switch (props.characteristicCount % props.numberOfCharacteristics) {
            case 0:
                opacity=DEFAULT_OPACITY
                break
            case 1:
                opacity= element['1stIonizationEnergy']===null ? 0 : 
                DEFAULT_OPACITY
                break
            case 2:
                opacity= element['electronAffinity']===null ? 0 :
                DEFAULT_OPACITY
                break
            case 3:
                opacity= element['boilingPoint']===null ? 0 :
                DEFAULT_OPACITY
                break
            case 4:
                opacity= element['meltingPoint']===null ? 0 :
                DEFAULT_OPACITY
                break

            default:
        }
        return opacity
    }

    const getOrbitNumber = (orbit) => {
        let orbitNumber = 0
        switch (orbit) {
            case 's':
                orbitNumber = 1
                break
            case 'p':
                orbitNumber = 2
                break
            case 'd':
                orbitNumber = 3
                break
            case 'f':
                orbitNumber = 4
                break
            default:
        }
        return orbitNumber
    }

    const cylindricalToCartesian = ([radius, theta, z]) => {
        return ([
            radius * Math.cos(theta),
            radius * Math.sin(theta),
            z
        ])
    }

    const cartesianToCylindrical = ([x, y, z]) => {
        return ([
            Math.sqrt(x * x + y * y),
            Math.atan2(y, x),
            z
        ])
    }

    const getTableBasePosition = (atomicNumber) => {
        return [element.tableColumn, 0, -elements[atomicNumber.toString()].tableRow]
    }

    const translateTablePosition = (position) => {
        return ([
            position[0] - 13,
            position[1] -6,
            position[2]
        ])
    }

    const getTablePosition = (atomicNumber) => {
        return translateTablePosition(getTableBasePosition(atomicNumber))
    }

    const getOrbitalPositionX = () => {
        let x = 0
        let shellNumber = parseInt(element.orbit.slice(0, 1))
        let orbitNumber = getOrbitNumber(element.orbit.slice(-1))
        switch (orbitNumber) {
            case 1:
                if (element.atomicNumber===2 || element.atomicNumber===1) {
                    x = element.spiralColumn - 4
                } else {
                    x = element.spiralColumn - 6
                }
                break
            case 2:
                if (shellNumber === 2 || shellNumber === 3) {
                    x = element.spiralColumn % 8
                } else {
                    x = (element.spiralColumn) % 10
                }
                break
            case 3:
                if (props.atomicNumber === 21 || props.atomicNumber === 39 || props.atomicNumber === 71 || props.atomicNumber === 103) {
                    x = 0
                } else {
                    x = (element.spiralColumn)
                }
                break
            default:
                if (props.atomicNumber === 57 || props.atomicNumber === 89) {
                    x = 0
                } else {
                    x = element.spiralColumn
                }
        }
        return x
    }

    const orbitalPosition = [
        getOrbitalPositionX(),
        2 * getOrbitNumber(element.orbit.slice(-1)) - 5,
        -2 * parseInt(element.orbit.slice(0))
    ]

    const { scale } = useSpring({
        scale: hovered ? 1.8 : 1,
        config: config.wobbly,
    });

    const handlePointerOver = () => {
        setHovered(true)
    }

    const handlePointerOut = () => {
        setHovered(false)
    }

    const handleBubblePointerOver = () => {
        setBubbleHovered(true)
    }

    const handleBubblePointerOut = () => {
        setBubbleHovered(false)
    }

    const getPeriod = () => {
        let period = 0
        switch (element['spiralRow']) {
            case 4:
            case 6:
            case 9:
            case 12:
                period = 10
                break
            case 8:
            case 11:
                period = 14
                break
            default:
                period = 8
        }
        return period
    }

    const radius0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[0]
    const theta0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[1]
    const z0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[2]

    const getRadius1 = () => {
        let radius = 0
        switch (element['spiralRow']) {
            case 4:
            case 6:
            case 9:
            case 12:
                radius = RADIUS_D
                break
            case 8:
            case 11:
                radius = RADIUS_F
                break
            default:
                radius = RADIUS_P
        }
        return radius
    }
    const getTheta1down = () => {
        let baseTheta = element.spiralColumn - 1 % getPeriod()
        let adjustedTheta = (baseTheta) / getPeriod() * 2 * Math.PI - 2 * Math.PI * element['winding'] - Math.PI * 4.1 / 8
        return adjustedTheta
    }
    const getWinding = () => {
        let winding = 0
        winding = element.orbit.slice(-1) === 's' ?
            0 :
            element.orbit.slice(-1) === 'p' ?
                element['winding'] :
                element.orbit.slice(-1) === 'd' ?
                    (element.atomicNumber === 71 || element.atomicNumber === 103 ?
                        element['winding'] :
                        element['winding'] + 1) :
                    (element.atomicNumber >= 67 && element.atomicNumber <= 70) || (element.atomicNumber >= 99 && element.atomicNumber <= 102) ?
                        element['winding'] - 1 :
                        element['winding']
        return winding
    }
    const getTheta1up = () => {
        let baseTheta = element.spiralColumn - 1 % getPeriod()
        let adjustedTheta = (baseTheta) / getPeriod() * 2 * Math.PI - 2 * Math.PI * getWinding() - Math.PI * 4.1 / 8
        return adjustedTheta

    }
    const z1 = -element.spiralRow - element.spiralColumn / getPeriod()

    const radius2 = cartesianToCylindrical(orbitalPosition)[0]
    const theta2 = cartesianToCylindrical(orbitalPosition)[1]
    const z2 = cartesianToCylindrical(orbitalPosition)[2]

    const radius3 = element['tableRow'] <= 7 ?
        element['tableRow'] + 3 :
        element['tableRow'] + 0
    const theta3 = element['tableRow'] <= 7 ?
        (element['tableColumn'] <= 2 ?
            element['tableColumn'] / 32 * 2 * Math.PI:
            (element['tableColumn'] + 14) / 32 * 2 * Math.PI) + Math.PI :
        (element['tableColumn']) / 32 * 2 * Math.PI+ Math.PI
    const z3 = -10

    const revalueTheta = (theta) => {
        return Math.PI < theta ? theta - 2 * Math.PI : theta
    }

    const getTransition0to1Coordinate = (t) => {
        const theta1 = getTheta1down()
        const distance = getRadius1() - RADIUS_P
        const cartesianCoordinate = cylindricalToCartesian([
            radius0 + t * (getRadius1() - radius0), 
            theta0 + t * (theta1 - theta0), 
            z0 + t * (z1 - z0)
        ])
        const translatedCoordinate = [cartesianCoordinate[0], cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance, cartesianCoordinate[2]]
        return translatedCoordinate
    }
    const getTransition1to2Coordinate = (t) => {
        const theta1 = getTheta1up()
        const distance = getRadius1() - RADIUS_P
        const cartesianCoordinate = cylindricalToCartesian([
            getRadius1() + (t-1) * (radius2 - getRadius1()), 
            theta1 + (t-1) * (theta2 - theta1), 
            z1 + (t-1) * (z2 - z1)
        ])
        const translatedCoordinate = [cartesianCoordinate[0], cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance, cartesianCoordinate[2]]
        return translatedCoordinate
    }
    const getTransition2to3Coordinate = (t) => {
        const cartesianCoordinate = cylindricalToCartesian([
            radius2 + (t-2) * (radius3 - radius2), 
            theta2 + Math.pow((t-2),2/3)* (theta3 - theta2), 
            z2 + (t-2) * (z3 - z2)
        ])
        return cartesianCoordinate

        // return [
        //     orbitalPosition[0] + (t - 2) * (getCircularPosition(props.atomicNumber)[0] - orbitalPosition[0]),
        //     orbitalPosition[1] + (t - 2) * (getCircularPosition(props.atomicNumber)[1] - orbitalPosition[1]),
        //     orbitalPosition[2] + (t - 2) * (getCircularPosition(props.atomicNumber)[2] - orbitalPosition[2])
        // ]
    }
    const getTransition3to4Coordinate = (t) => {
        const revaluedTheta0 = theta0 < 1*Math.PI/2 ? theta0 + 2 * Math.PI : theta0
        const cartesianCoordinate = cylindricalToCartesian([
            radius3 + (t-3) * (radius0 - radius3), 
            theta3 + Math.pow(t-3,3)* (revaluedTheta0 - theta3), 
            z3 + (t-3) * (z0 - z3)
        ])
        return cartesianCoordinate
    }

    const getCoordinate = (t) => {
        t = t % props.numberOfShapes
        if (0 <= t && t <= 1) {
            return getTransition0to1Coordinate(t)
        } else if (1 < t && t <= 2) {
            return getTransition1to2Coordinate(t)
        } else if (2 < t && t <= 3) {
            return getTransition2to3Coordinate(t)            
        } else if (3 < t && t <= 4) {
            return getTransition3to4Coordinate(t)         
        }
    }

    const getRotationAngle = (t) => {
        t = t % props.numberOfShapes
        if (t >= 0 && t <= 1) {
            const theta1 = getTheta1down()
            const baseTheta =  theta0 + t * (theta1 - theta0)

            return [0, 0, revalueTheta(baseTheta + Math.PI * 1.1 / 2) * t]
        } else if (t > 1 && t <= 2) {
            const theta1 = getTheta1up()
            const baseTheta =theta1 + (t-1) * (theta2 - theta1)

            return [0, 0, revalueTheta(baseTheta + Math.PI * 1.1 / 2) * (2 - t)]
        } else if (t > 2 && t <= 3) {
            const baseTheta = theta2 + Math.pow((t-2),1/2)* (theta3 - theta2) 
            return [0, 0, revalueTheta(baseTheta + Math.PI * 1.1 / 2) * (t - 2)]
        } else if (t > 3 && t <= 4) {
            const revaluedTheta0 = theta0 < 1*Math.PI/2 ? theta0 + 2 * Math.PI : theta0
             
            return [0, 0, revalueTheta(theta3 + Math.pow(t-3,2)* (revaluedTheta0 - theta3) + Math.PI * 1.1 / 2) * (4 - t)]

        } else {
            return [0, 0, 0]
        }
    }

    const handleElementClick = () => {
        props.setAtomicNumber(props.atomicNumber)
        props.setIsModalVisible(1)
    }
    
    // const handleDetailClick = () => {
    //     console.log('clicked')
    // }

    return (

        <animated.mesh {...props}
            position={transitionParameter.to(t => getCoordinate(t))}
            onPointerOver={() => handlePointerOver()}
            onPointerOut={() => handlePointerOut()}
            scale={scale}
            onClick={handleElementClick}
            rotation={transitionParameter.to(t => getRotationAngle(t))}

        >
            {/* <group

            > */}
                <Quadrilateral {...props}
                    points={[
                        [0, 0, 0],
                        [0, 0, -cardHeight],
                        [cardWidth, 0, -cardHeight],
                        [cardWidth, 0, 0]
                    ]}
                    color={getColor()}
                    opacity={getOpacity()}
                    
                />
                {
                (props.selectedAtomicNumber === element.atomicNumber) &&
                    <FocusFrame {...props}
                        points={[
                            [0, 0, 0],
                            [0, 0, -cardHeight],
                            [cardWidth, 0, -cardHeight],
                            [cardWidth, 0, 0]
                        ]}
                        color={getColor()}
                        
                    />
                }
                <group rotation={[Math.PI / 2, 0, 0]} >
                    <Text
                        position={[0.1, -0.15, 0.01]}
                        fontSize={0.2}
                        color='#444'
                        anchorX="center" anchorY="middle">
                        {props.atomicNumber}
                    </Text>

                    <Text
                        position={[0.4, -0.5, 0.01]}
                        fontSize={0.5}
                        color={props.characteristicCount % props.numberOfCharacteristics === 0 ? '#000' : '#fff'}
                        anchorX="center" anchorY="middle">
                        {element.symbol}

                    </Text>
                    <Text
                        position={[0.3, -0.7, 0.01]}
                        fontSize={0.15}
                        color='#000'
                        anchorX="center" anchorY="middle">
                        {element.name}
                    </Text>
                </group>

                <Html
                    zIndexRange={[100, 200]}
                    onClick = {()=>console.log('clicked')}
                >
                    {/* <div
                        onPointerOver={() => handleBubblePointerOver()}
                        onPointerOut={() => handleBubblePointerOut()}
                        // onClick = {()=>console.log('clicked')}
                    >
                        {
                            (hovered || bubbleHovered) &&
                            <ElementBubble
                                {...props}
                                backgroundColor={color}
                                textColor={color}
                                element={element}
                                // onClick={handleElementClick}
                            />
                        }
                    </div> */}
                </Html>
            {/* </group> */}
        </animated.mesh>

    );
};

export default Elements;

// const handleDetailClick = () =>{
//     console.log('clicked')
// }


const ElementBubble = (props) => {

    return (
        <StyledElementBubble >
            <div onClick={props.onClick} style={{ textAlign: 'left', color:'blue' }}>
                <span className='modalLink'>
                    詳細をみる
                </span>
            </div>
            <div style={{ textAlign: 'left' }}>
                {props.atomicNumber}
            </div>
            <div style={{ textAlign: 'center' }}>
                {props.element.name}
            </div>

            <div style={{ textAlign: 'left', marginLeft: '20px' }}>
                {Object.entries(props.element.electron).map(([key, value]) => (
                    <div key={key}>
                        {key}:&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <ul> */}
                        {Object.entries(value).map(([subKey, subValue]) => (
                            <span key={subKey}>{subValue}&nbsp;</span>
                        ))}
                        {/* </ul> */}
                    </div>
                ))}
            </div>


            <div
                className='colorRectangle'
                onClick={props.onElementClick}
            />
            <div onClick={props.onElementClick}>
                <span className='modalLink'>
                </span>
            </div>
        </StyledElementBubble>)
}


const StyledElementBubble = styled.div`
    position:absolute;
    top:40px;
    left:40px;
    width: 120px;
    background: #fff;
    border-radius: 0px 24px 24px 24px;
    font-size: 12px;
    padding: 4px;
    text-align:center;
    .modalLink{
        color:#0000FF;
        cursor: pointer;
        text-decoration: underline;
    }
    div{
        margin: 0 auto;
    }
`;