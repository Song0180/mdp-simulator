// import { message } from 'antd';
// import React from 'react';

// import styles from './styles.module.css';

// const NUM_OF_GRID_CELLS = 20;
// const ROBOT_VIRTUAL_WIDTH = 58; // pixels
// const GRID_CELL_WIDTH = 25; // pixels
// const initialGrid = { x: 1, y: 1 };
// const MAX_X_Y =
//   (NUM_OF_GRID_CELLS - 0.5) * GRID_CELL_WIDTH - ROBOT_VIRTUAL_WIDTH;
// const MIN_X_Y = 1.5 * GRID_CELL_WIDTH - ROBOT_VIRTUAL_WIDTH / 2;
// const LEFT_TURNING_RADIUS = 3 * GRID_CELL_WIDTH; // pixels
// const RIGHT_TURNING_RADIUS = 3 * GRID_CELL_WIDTH; // pixels
// const TURN_DURATION = 2000; // ms
// const FWD_1_GRID_DURATION = 500;
// const turnings = ['LEFT', 'RIGHT'];
// const rev_turnings = ['REV_LEFT', 'REV_RIGHT'];
// const REV = 'REV';

// // for animation
// // const getDegreeFromDirectionFacing = (facing) => {
// //   switch (facing) {
// //     case 'north':
// //       return 0;
// //     case 'south':
// //       return 180;
// //     case 'east':
// //       return 90;
// //     case 'west':
// //       return 270;
// //     default:
// //       return 0;
// //   }
// // };

// const gridCellToPixels = (gridCell) => {
//   const xInPx = (gridCell.x + 0.5) * GRID_CELL_WIDTH - ROBOT_VIRTUAL_WIDTH / 2;
//   const yInPx = (gridCell.y + 0.5) * GRID_CELL_WIDTH - ROBOT_VIRTUAL_WIDTH / 2;
//   return { x: xInPx, y: yInPx };
// };

// const numOfGridCellToPixels = (numOfGridCells) => {
//   return numOfGridCells * GRID_CELL_WIDTH;
// };

// const Robot = ({ animate = false, motionSetSegments = [] }) => {
//   const [position, setPosition] = React.useState(gridCellToPixels(initialGrid));
//   const [facing, setFacing] = React.useState({
//     facing: 'north',
//     prevDirection: null,
//   });

//   const [transitionDuration, setTransitionDuration] =
//     React.useState(FWD_1_GRID_DURATION);

//   const moveForward = React.useCallback((numOfGridCells = 1, facing) => {
//     setTransitionDuration(FWD_1_GRID_DURATION * numOfGridCells);
//     setPosition((position) => {
//       switch (facing) {
//         case 'north':
//           return {
//             x: position.x,
//             y: Math.min(
//               position.y + numOfGridCellToPixels(numOfGridCells),
//               MAX_X_Y
//             ),
//           };
//         case 'east':
//           return {
//             x: Math.min(
//               position.x + numOfGridCellToPixels(numOfGridCells),
//               MAX_X_Y
//             ),
//             y: position.y,
//           };
//         case 'south':
//           return {
//             x: position.x,
//             y: Math.max(
//               position.y - numOfGridCellToPixels(numOfGridCells),
//               MIN_X_Y
//             ),
//           };
//         case 'west':
//           return {
//             x: Math.max(
//               position.x - numOfGridCellToPixels(numOfGridCells),
//               MIN_X_Y
//             ),
//             y: position.y,
//           };
//         default:
//           return { x: position.x, y: position.y };
//       }
//     });
//   }, []);

//   const turn = React.useCallback(
//     (direction, currentFacing, isReverse = false) => {
//       setTransitionDuration(TURN_DURATION);
//       switch (currentFacing) {
//         case 'north':
//           if (direction === 'left') {
//             setPosition((position) => {
//               return {
//                 x: position.x - LEFT_TURNING_RADIUS,
//                 y: isReverse
//                   ? position.y - LEFT_TURNING_RADIUS
//                   : position.y + LEFT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'east' : 'west',
//               prevDirection: 'left',
//             });
//           } else {
//             setPosition((position) => {
//               return {
//                 x: position.x + RIGHT_TURNING_RADIUS,
//                 y: isReverse
//                   ? position.y - RIGHT_TURNING_RADIUS
//                   : position.y + RIGHT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'west' : 'east',
//               prevDirection: 'right',
//             });
//           }
//           break;
//         case 'east':
//           if (direction === 'left') {
//             setPosition((position) => {
//               return {
//                 x: isReverse
//                   ? position.x - LEFT_TURNING_RADIUS
//                   : position.x + LEFT_TURNING_RADIUS,
//                 y: position.y + LEFT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'south' : 'north',
//               prevDirection: 'left',
//             });
//           } else {
//             setPosition((position) => {
//               return {
//                 x: isReverse
//                   ? position.x - RIGHT_TURNING_RADIUS
//                   : position.x + RIGHT_TURNING_RADIUS,
//                 y: position.y - RIGHT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'north' : 'south',
//               prevDirection: 'right',
//             });
//           }
//           break;
//         case 'south':
//           if (direction === 'left') {
//             setPosition((position) => {
//               return {
//                 x: position.x + LEFT_TURNING_RADIUS,
//                 y: isReverse
//                   ? position.y + LEFT_TURNING_RADIUS
//                   : position.y - LEFT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'west' : 'east',
//               prevDirection: 'left',
//             });
//           } else {
//             setPosition((position) => {
//               return {
//                 x: position.x - RIGHT_TURNING_RADIUS,
//                 y: isReverse
//                   ? position.y + RIGHT_TURNING_RADIUS
//                   : position.y - RIGHT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'east' : 'west',
//               prevDirection: 'right',
//             });
//           }
//           break;
//         case 'west':
//           if (direction === 'left') {
//             setPosition((position) => {
//               return {
//                 x: isReverse
//                   ? position.x + LEFT_TURNING_RADIUS
//                   : position.x - LEFT_TURNING_RADIUS,
//                 y: position.y - LEFT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'north' : 'south',
//               prevDirection: 'left',
//             });
//           } else {
//             setPosition((position) => {
//               return {
//                 x: isReverse
//                   ? position.x + RIGHT_TURNING_RADIUS
//                   : position.x - RIGHT_TURNING_RADIUS,
//                 y: position.y + RIGHT_TURNING_RADIUS,
//               };
//             });
//             setFacing({
//               facing: isReverse ? 'south' : 'north',
//               prevDirection: 'right',
//             });
//           }
//           break;
//         default:
//           message.error('Invalid direction');
//       }
//     },
//     []
//   );

//   const getMotionSet = React.useCallback(
//     (motionSet) => {
//       const res = [];
//       for (const motion of motionSet) {
//         const [distance, facing, motionToReachHere] = motion;

//         let callback;
//         if (turnings.includes(motionToReachHere)) {
//           callback = () => turn(motionToReachHere, facing, false);
//         } else if (rev_turnings.includes(motionToReachHere)) {
//           callback = () => turn(motionToReachHere, facing, true);
//         } else {
//           const numOfGridCells =
//             motionToReachHere === REV ? distance * -1 : distance;
//           callback = () => moveForward(numOfGridCells, facing);
//         }
//         res.push(callback);
//       }
//       return res;
//     },
//     [moveForward, turn]
//   );

//   React.useEffect(() => {
//     if (animate) {
//       for (const motionSet of motionSetSegments) {
//       }
//     }
//   }, [animate, getMotionSet, motionSetSegments, transitionDuration]);

//   return (
//     <div
//       className={styles.container}
//       style={{
//         left: `${position.x}px`,
//         bottom: `${position.y}px`,
//         transitionDuration: `${transitionDuration}ms`,
//       }}
//     >
//       <img
//         className={styles.img}
//         src={process.env.PUBLIC_URL + '/robot.png'}
//         alt='robot'
//       />
//     </div>
//   );
// };

// export default Robot;
