 const boxes = document.querySelectorAll(".box");
        const info = document.querySelector(".info");
        const resetButton = document.getElementById("reset");
        let boxtexts = document.querySelectorAll('.boxtext');
        let turn = "X";
        let gameover = false;

        // Change turn
        const changeTurn = () => { return turn === "X" ? "0" : "X"; }

        // Check winner
        const checkWin = () => {
            let wins = [
                [0,1,2],[3,4,5],[6,7,8],
                [0,3,6],[1,4,7],[2,5,8],
                [0,4,8],[2,4,6],
            ];

            wins.forEach(e => {
                if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && 
                    (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && 
                    (boxtexts[e[0]].innerText !== "")) {

                    // Winner Message
                    info.innerText = boxtexts[e[0]].innerText + " WON 🎉";
                    info.classList.add("win");

                    // Highlight winning boxes
                    e.forEach(index => { boxes[index].classList.add("win-box"); });

                    // Full-screen confetti
                    confetti({ particleCount: 200, spread: 160, origin: { y: 0.5 } });

                    gameover = true;
                }
            });
        }

        // Box click event
        Array.from(boxes).forEach(element => {
            let boxtext = element.querySelector('.boxtext');
            element.addEventListener('click', () => {
                if (boxtext.innerText === '' && !gameover) {
                    boxtext.innerText = turn;
                    turn = changeTurn();
                    checkWin();
                    if(!gameover) { info.innerText = "Turn for " + turn; }
                }
            });
        });

        // Reset button
        resetButton.addEventListener('click', () => {
            Array.from(boxtexts).forEach(boxtext => {
                boxtext.innerText = "";
                boxtext.parentElement.classList.remove("win-box");
            });
            info.classList.remove("win");
            turn = "X";
            gameover = false;
            info.innerText = "Turn for " + turn;
        });