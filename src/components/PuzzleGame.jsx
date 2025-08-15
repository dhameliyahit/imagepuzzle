import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import TopAd from "./TopAd";
import BottomAd from "./BottomAd";

export default function PuzzleGame() {
    const { levelId: levelParam } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [solvedBoard, setSolvedBoard] = useState([]);
    const [tiles, setTiles] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(Number(levelParam) || 1);
    const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("coins")) || 0);
    const [unlockedLevels, setUnlockedLevels] = useState(
        () => JSON.parse(localStorage.getItem("unlockedLevels")) || [1]
    );
    const [hintIndex, setHintIndex] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);

    const totalLevels = 30;

    const levels = [
        {
            level: 1,
            mainImage: "/asset/level1/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level1/101.png" },
                { id: 1, imageUrl: "/asset/level1/102.png" },
                { id: 2, imageUrl: "/asset/level1/103.png" },
                { id: 3, imageUrl: "/asset/level1/104.png" },
                { id: 4, imageUrl: "/asset/level1/105.png" },
                { id: 5, imageUrl: "/asset/level1/106.png" },
                { id: 6, imageUrl: "/asset/level1/107.png" },
                { id: 7, imageUrl: "/asset/level1/108.png" },
                { id: null, imageUrl: null } // empty tile
            ]
        },
        {
            level: 2,
            mainImage: "/asset/level2/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level2/201.png" },
                { id: 1, imageUrl: "/asset/level2/202.png" },
                { id: 2, imageUrl: "/asset/level2/203.png" },
                { id: 3, imageUrl: "/asset/level2/204.png" },
                { id: 4, imageUrl: "/asset/level2/205.png" },
                { id: 5, imageUrl: "/asset/level2/206.png" },
                { id: 6, imageUrl: "/asset/level2/207.png" },
                { id: 7, imageUrl: "/asset/level2/208.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 3,
            mainImage: "/asset/level3/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level3/01.png" },
                { id: 1, imageUrl: "/asset/level3/02.png" },
                { id: 2, imageUrl: "/asset/level3/03.png" },
                { id: 3, imageUrl: "/asset/level3/04.png" },
                { id: 4, imageUrl: "/asset/level3/05.png" },
                { id: 5, imageUrl: "/asset/level3/06.png" },
                { id: 6, imageUrl: "/asset/level3/07.png" },
                { id: 7, imageUrl: "/asset/level3/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 4,
            mainImage: "/asset/level4/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level4/01.png" },
                { id: 1, imageUrl: "/asset/level4/02.png" },
                { id: 2, imageUrl: "/asset/level4/03.png" },
                { id: 3, imageUrl: "/asset/level4/04.png" },
                { id: 4, imageUrl: "/asset/level4/05.png" },
                { id: 5, imageUrl: "/asset/level4/06.png" },
                { id: 6, imageUrl: "/asset/level4/07.png" },
                { id: 7, imageUrl: "/asset/level4/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 5,
            mainImage: "/asset/level5/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level5/01.png" },
                { id: 1, imageUrl: "/asset/level5/02.png" },
                { id: 2, imageUrl: "/asset/level5/03.png" },
                { id: 3, imageUrl: "/asset/level5/04.png" },
                { id: 4, imageUrl: "/asset/level5/05.png" },
                { id: 5, imageUrl: "/asset/level5/06.png" },
                { id: 6, imageUrl: "/asset/level5/07.png" },
                { id: 7, imageUrl: "/asset/level5/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 6,
            mainImage: "/asset/level6/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level6/01.png" },
                { id: 1, imageUrl: "/asset/level6/02.png" },
                { id: 2, imageUrl: "/asset/level6/03.png" },
                { id: 3, imageUrl: "/asset/level6/04.png" },
                { id: 4, imageUrl: "/asset/level6/05.png" },
                { id: 5, imageUrl: "/asset/level6/06.png" },
                { id: 6, imageUrl: "/asset/level6/07.png" },
                { id: 7, imageUrl: "/asset/level6/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 7,
            mainImage: "/asset/level7/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level7/01.png" },
                { id: 1, imageUrl: "/asset/level7/02.png" },
                { id: 2, imageUrl: "/asset/level7/03.png" },
                { id: 3, imageUrl: "/asset/level7/04.png" },
                { id: 4, imageUrl: "/asset/level7/05.png" },
                { id: 5, imageUrl: "/asset/level7/06.png" },
                { id: 6, imageUrl: "/asset/level7/07.png" },
                { id: 7, imageUrl: "/asset/level7/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 8,
            mainImage: "/asset/level8/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level8/01.png" },
                { id: 1, imageUrl: "/asset/level8/02.png" },
                { id: 2, imageUrl: "/asset/level8/03.png" },
                { id: 3, imageUrl: "/asset/level8/04.png" },
                { id: 4, imageUrl: "/asset/level8/05.png" },
                { id: 5, imageUrl: "/asset/level8/06.png" },
                { id: 6, imageUrl: "/asset/level8/07.png" },
                { id: 7, imageUrl: "/asset/level8/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 9,
            mainImage: "/asset/level9/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level9/01.png" },
                { id: 1, imageUrl: "/asset/level9/02.png" },
                { id: 2, imageUrl: "/asset/level9/03.png" },
                { id: 3, imageUrl: "/asset/level9/04.png" },
                { id: 4, imageUrl: "/asset/level9/05.png" },
                { id: 5, imageUrl: "/asset/level9/06.png" },
                { id: 6, imageUrl: "/asset/level9/07.png" },
                { id: 7, imageUrl: "/asset/level9/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 10,
            mainImage: "/asset/level10/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level10/01.png" },
                { id: 1, imageUrl: "/asset/level10/02.png" },
                { id: 2, imageUrl: "/asset/level10/03.png" },
                { id: 3, imageUrl: "/asset/level10/04.png" },
                { id: 4, imageUrl: "/asset/level10/05.png" },
                { id: 5, imageUrl: "/asset/level10/06.png" },
                { id: 6, imageUrl: "/asset/level10/07.png" },
                { id: 7, imageUrl: "/asset/level10/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 11,
            mainImage: "/asset/level11/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level11/01.png" },
                { id: 1, imageUrl: "/asset/level11/02.png" },
                { id: 2, imageUrl: "/asset/level11/03.png" },
                { id: 3, imageUrl: "/asset/level11/04.png" },
                { id: 4, imageUrl: "/asset/level11/05.png" },
                { id: 5, imageUrl: "/asset/level11/06.png" },
                { id: 6, imageUrl: "/asset/level11/07.png" },
                { id: 7, imageUrl: "/asset/level11/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 12,
            mainImage: "/asset/level12/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level12/01.png" },
                { id: 1, imageUrl: "/asset/level12/02.png" },
                { id: 2, imageUrl: "/asset/level12/03.png" },
                { id: 3, imageUrl: "/asset/level12/04.png" },
                { id: 4, imageUrl: "/asset/level12/05.png" },
                { id: 5, imageUrl: "/asset/level12/06.png" },
                { id: 6, imageUrl: "/asset/level12/07.png" },
                { id: 7, imageUrl: "/asset/level12/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 13,
            mainImage: "/asset/level13/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level13/01.png" },
                { id: 1, imageUrl: "/asset/level13/02.png" },
                { id: 2, imageUrl: "/asset/level13/03.png" },
                { id: 3, imageUrl: "/asset/level13/04.png" },
                { id: 4, imageUrl: "/asset/level13/05.png" },
                { id: 5, imageUrl: "/asset/level13/06.png" },
                { id: 6, imageUrl: "/asset/level13/07.png" },
                { id: 7, imageUrl: "/asset/level13/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 14,
            mainImage: "/asset/level14/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level14/01.png" },
                { id: 1, imageUrl: "/asset/level14/02.png" },
                { id: 2, imageUrl: "/asset/level14/03.png" },
                { id: 3, imageUrl: "/asset/level14/04.png" },
                { id: 4, imageUrl: "/asset/level14/05.png" },
                { id: 5, imageUrl: "/asset/level14/06.png" },
                { id: 6, imageUrl: "/asset/level14/07.png" },
                { id: 7, imageUrl: "/asset/level14/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 15,
            mainImage: "/asset/level15/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level15/01.png" },
                { id: 1, imageUrl: "/asset/level15/02.png" },
                { id: 2, imageUrl: "/asset/level15/03.png" },
                { id: 3, imageUrl: "/asset/level15/04.png" },
                { id: 4, imageUrl: "/asset/level15/05.png" },
                { id: 5, imageUrl: "/asset/level15/06.png" },
                { id: 6, imageUrl: "/asset/level15/07.png" },
                { id: 7, imageUrl: "/asset/level15/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 16,
            mainImage: "/asset/level16/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level16/01.png" },
                { id: 1, imageUrl: "/asset/level16/02.png" },
                { id: 2, imageUrl: "/asset/level16/03.png" },
                { id: 3, imageUrl: "/asset/level16/04.png" },
                { id: 4, imageUrl: "/asset/level16/05.png" },
                { id: 5, imageUrl: "/asset/level16/06.png" },
                { id: 6, imageUrl: "/asset/level16/07.png" },
                { id: 7, imageUrl: "/asset/level16/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 17,
            mainImage: "/asset/level17/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level17/01.png" },
                { id: 1, imageUrl: "/asset/level17/02.png" },
                { id: 2, imageUrl: "/asset/level17/03.png" },
                { id: 3, imageUrl: "/asset/level17/04.png" },
                { id: 4, imageUrl: "/asset/level17/05.png" },
                { id: 5, imageUrl: "/asset/level17/06.png" },
                { id: 6, imageUrl: "/asset/level17/07.png" },
                { id: 7, imageUrl: "/asset/level17/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 18,
            mainImage: "/asset/level18/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level18/01.png" },
                { id: 1, imageUrl: "/asset/level18/02.png" },
                { id: 2, imageUrl: "/asset/level18/03.png" },
                { id: 3, imageUrl: "/asset/level18/04.png" },
                { id: 4, imageUrl: "/asset/level18/05.png" },
                { id: 5, imageUrl: "/asset/level18/06.png" },
                { id: 6, imageUrl: "/asset/level18/07.png" },
                { id: 7, imageUrl: "/asset/level18/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 19,
            mainImage: "/asset/level19/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level19/01.png" },
                { id: 1, imageUrl: "/asset/level19/02.png" },
                { id: 2, imageUrl: "/asset/level19/03.png" },
                { id: 3, imageUrl: "/asset/level19/04.png" },
                { id: 4, imageUrl: "/asset/level19/05.png" },
                { id: 5, imageUrl: "/asset/level19/06.png" },
                { id: 6, imageUrl: "/asset/level19/07.png" },
                { id: 7, imageUrl: "/asset/level19/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 20,
            mainImage: "/asset/level20/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level20/01.png" },
                { id: 1, imageUrl: "/asset/level20/02.png" },
                { id: 2, imageUrl: "/asset/level20/03.png" },
                { id: 3, imageUrl: "/asset/level20/04.png" },
                { id: 4, imageUrl: "/asset/level20/05.png" },
                { id: 5, imageUrl: "/asset/level20/06.png" },
                { id: 6, imageUrl: "/asset/level20/07.png" },
                { id: 7, imageUrl: "/asset/level20/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 21,
            mainImage: "/asset/level21/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level21/01.png" },
                { id: 1, imageUrl: "/asset/level21/02.png" },
                { id: 2, imageUrl: "/asset/level21/03.png" },
                { id: 3, imageUrl: "/asset/level21/04.png" },
                { id: 4, imageUrl: "/asset/level21/05.png" },
                { id: 5, imageUrl: "/asset/level21/06.png" },
                { id: 6, imageUrl: "/asset/level21/07.png" },
                { id: 7, imageUrl: "/asset/level21/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 22,
            mainImage: "/asset/level22/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level22/01.png" },
                { id: 1, imageUrl: "/asset/level22/02.png" },
                { id: 2, imageUrl: "/asset/level22/03.png" },
                { id: 3, imageUrl: "/asset/level22/04.png" },
                { id: 4, imageUrl: "/asset/level22/05.png" },
                { id: 5, imageUrl: "/asset/level22/06.png" },
                { id: 6, imageUrl: "/asset/level22/07.png" },
                { id: 7, imageUrl: "/asset/level22/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 23,
            mainImage: "/asset/level23/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level23/01.png" },
                { id: 1, imageUrl: "/asset/level23/02.png" },
                { id: 2, imageUrl: "/asset/level23/03.png" },
                { id: 3, imageUrl: "/asset/level23/04.png" },
                { id: 4, imageUrl: "/asset/level23/05.png" },
                { id: 5, imageUrl: "/asset/level23/06.png" },
                { id: 6, imageUrl: "/asset/level23/07.png" },
                { id: 7, imageUrl: "/asset/level23/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 24,
            mainImage: "/asset/level24/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level24/01.png" },
                { id: 1, imageUrl: "/asset/level24/02.png" },
                { id: 2, imageUrl: "/asset/level24/03.png" },
                { id: 3, imageUrl: "/asset/level24/04.png" },
                { id: 4, imageUrl: "/asset/level24/05.png" },
                { id: 5, imageUrl: "/asset/level24/06.png" },
                { id: 6, imageUrl: "/asset/level24/07.png" },
                { id: 7, imageUrl: "/asset/level24/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 25,
            mainImage: "/asset/level25/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level25/01.png" },
                { id: 1, imageUrl: "/asset/level25/02.png" },
                { id: 2, imageUrl: "/asset/level25/03.png" },
                { id: 3, imageUrl: "/asset/level25/04.png" },
                { id: 4, imageUrl: "/asset/level25/05.png" },
                { id: 5, imageUrl: "/asset/level25/06.png" },
                { id: 6, imageUrl: "/asset/level25/07.png" },
                { id: 7, imageUrl: "/asset/level25/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 26,
            mainImage: "/asset/level26/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level26/01.png" },
                { id: 1, imageUrl: "/asset/level26/02.png" },
                { id: 2, imageUrl: "/asset/level26/03.png" },
                { id: 3, imageUrl: "/asset/level26/04.png" },
                { id: 4, imageUrl: "/asset/level26/05.png" },
                { id: 5, imageUrl: "/asset/level26/06.png" },
                { id: 6, imageUrl: "/asset/level26/07.png" },
                { id: 7, imageUrl: "/asset/level26/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 27,
            mainImage: "/asset/level27/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level27/01.png" },
                { id: 1, imageUrl: "/asset/level27/02.png" },
                { id: 2, imageUrl: "/asset/level27/03.png" },
                { id: 3, imageUrl: "/asset/level27/04.png" },
                { id: 4, imageUrl: "/asset/level27/05.png" },
                { id: 5, imageUrl: "/asset/level27/06.png" },
                { id: 6, imageUrl: "/asset/level27/07.png" },
                { id: 7, imageUrl: "/asset/level27/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 28,
            mainImage: "/asset/level28/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level28/01.png" },
                { id: 1, imageUrl: "/asset/level28/02.png" },
                { id: 2, imageUrl: "/asset/level28/03.png" },
                { id: 3, imageUrl: "/asset/level28/04.png" },
                { id: 4, imageUrl: "/asset/level28/05.png" },
                { id: 5, imageUrl: "/asset/level28/06.png" },
                { id: 6, imageUrl: "/asset/level28/07.png" },
                { id: 7, imageUrl: "/asset/level28/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 29,
            mainImage: "/asset/level29/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level29/01.png" },
                { id: 1, imageUrl: "/asset/level29/02.png" },
                { id: 2, imageUrl: "/asset/level29/03.png" },
                { id: 3, imageUrl: "/asset/level29/04.png" },
                { id: 4, imageUrl: "/asset/level29/05.png" },
                { id: 5, imageUrl: "/asset/level29/06.png" },
                { id: 6, imageUrl: "/asset/level29/07.png" },
                { id: 7, imageUrl: "/asset/level29/08.png" },
                { id: null, imageUrl: null }
            ]
        },
        {
            level: 30,
            mainImage: "/asset/level30/main.jpg",
            solvedBoard: [
                { id: 0, imageUrl: "/asset/level30/01.png" },
                { id: 1, imageUrl: "/asset/level30/02.png" },
                { id: 2, imageUrl: "/asset/level30/03.png" },
                { id: 3, imageUrl: "/asset/level30/04.png" },
                { id: 4, imageUrl: "/asset/level30/05.png" },
                { id: 5, imageUrl: "/asset/level30/06.png" },
                { id: 6, imageUrl: "/asset/level30/07.png" },
                { id: 7, imageUrl: "/asset/level30/08.png" },
                { id: null, imageUrl: null }
            ]
        },
    ];

    // Get level data
    useEffect(() => {
        const levelData = levels.find(l => l.level === currentLevel);
        if (levelData) {
            setImageUrl(levelData.mainImage);
            setSolvedBoard(levelData.solvedBoard);
            setTiles(shuffleBoard([...levelData.solvedBoard], currentLevel));
        }
    }, [currentLevel]);

    // Save coins & unlocked levels
    useEffect(() => localStorage.setItem("coins", coins), [coins]);
    useEffect(() => localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels)), [unlockedLevels]);

    // Shuffle board and show hint
    useEffect(() => {
        const blankIndex = tiles.findIndex(t => t.id === null);
        const possibleMoves = [blankIndex - 1, blankIndex + 1, blankIndex - 3, blankIndex + 3]
            .filter(pos => pos >= 0 && pos < tiles.length && canMove(pos, blankIndex));

        if (possibleMoves.length > 0) {
            const randomChoice = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            setHintIndex(randomChoice);
            setTimeout(() => setHintIndex(null), 3000);
        }
    }, [tiles]);

    function shuffleBoard(startBoard, level) {
        let moves = level <= 5 ? 10 : level <= 20 ? 25 : 50;
        let board = [...startBoard];
        let blankIndex = board.findIndex(t => t.id === null);

        for (let i = 0; i < moves; i++) {
            const possibleMoves = [blankIndex - 1, blankIndex + 1, blankIndex - 3, blankIndex + 3]
                .filter(pos => pos >= 0 && pos < board.length && canMove(pos, blankIndex));

            const moveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            [board[blankIndex], board[moveIndex]] = [board[moveIndex], board[blankIndex]];
            blankIndex = moveIndex;
        }
        return board;
    }

    function canMove(tileIndex, blankIndex) {
        const row1 = Math.floor(tileIndex / 3);
        const col1 = tileIndex % 3;
        const row2 = Math.floor(blankIndex / 3);
        const col2 = blankIndex % 3;
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    function moveTile(index) {
        const blankIndex = tiles.findIndex(t => t.id === null);
        if (canMove(index, blankIndex)) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
            setTiles(newTiles);
            if (isSolved(newTiles)) levelComplete();
        }
    }

    function isSolved(board) {
        return board.every((tile, i) => tile.id === solvedBoard[i].id);
    }

    function launchConfetti() {
        const duration = 2000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    }

    function levelComplete() {
        setShowCelebration(true);
        launchConfetti();
        setCoins(prev => prev + 10);
        if (!unlockedLevels.includes(currentLevel + 1) && currentLevel < totalLevels) {
            setUnlockedLevels(prev => [...prev, currentLevel + 1]);
        }
        setTimeout(() => {
            setShowCelebration(false);
            if (currentLevel < totalLevels) {
                setCurrentLevel(prev => prev + 1);
                navigate(`/play/${currentLevel + 1}`);
            }
        }, 3000);
    }

    return (
        <>
            <TopAd />
            <div className="relative flex flex-col lg:flex-row justify-center items-center gap-4 p-4">
                {/* Back Button */}
                <div
                    onClick={() => navigate("/levels")}
                    className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-lg shadow-lg cursor-pointer hover:bg-black/80 transition text-sm sm:text-base"
                >
                    ⬅ Back
                </div>

                {/* Top Right Info */}
                <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs sm:text-sm">
                    <p>Level: {currentLevel}</p>
                    <p>Coins: {coins} 🪙</p>
                </div>

                {/* Full Image */}
                <div className="flex flex-col items-center justify-center w-full p-2 space-y-4">

                    {/* Full Image Preview */}
                    <div className="w-full max-w-[350px] sm:max-w-[400px] aspect-square border rounded-xl shadow-lg overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="full"
                            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Puzzle Grid */}
                    <div className="w-full max-w-[350px] sm:max-w-[600px] aspect-square grid grid-cols-3 gap-2 sm:gap-3">
                        {tiles.map((tile, i) => (
                            <div
                                key={i}
                                className={`relative flex items-center justify-center cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform duration-200 ${tile.id === null
                                    ? "bg-gradient-to-br from-gray-900 to-gray-700 border border-gray-600"
                                    : "bg-white hover:scale-105"
                                    }`}
                                style={
                                    tile.id !== null
                                        ? {
                                            backgroundImage: `url(${tile.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }
                                        : {}
                                }
                                onClick={() => moveTile(i)}
                            >
                                {/* Hint Overlay */}
                                {hintIndex === i && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="absolute w-full h-full rounded-lg bg-blue-600/50 animate-ping"></span>
                                    </span>
                                )}

                                {/* Tile Number */}
                                {tile.id !== null && (
                                    <span className="absolute top-1 right-1 text-xs sm:text-sm font-semibold bg-white/80 text-black px-2 py-0.5 rounded-md shadow">
                                        {tile.id + 1}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Celebration Modal */}
                {showCelebration && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg w-[90%] max-w-md"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 120 }}
                        >
                            <h2 className="text-xl sm:text-3xl font-bold text-green-600 mb-2">
                                🎉 Level {currentLevel} Complete!
                            </h2>
                            <p className="text-sm sm:text-lg text-gray-700">+10 coins earned!</p>
                            <p className="mt-2 text-gray-500 text-xs sm:text-sm">
                                Next level starting in 3 seconds...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <BottomAd />
        </>
    );
}
