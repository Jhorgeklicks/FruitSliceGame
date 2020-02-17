    var playing = false;
    var score;
    var livesleft;
    var fruits = ["apple", "Tomato", "banana", "Bread", "Cake", "Case", "Gift", "gift2", "strawberry1", "Syrup"];
    var step;
    var action;
    var run;

    $(document).ready(function () {

        $("#startReset").click(function () {
            //   playing = true;
            if (playing == true) {
                location.reload();
            } else {
                playing = true;

                score = 0;
                $("#score_value").html(score);

                $("#lives").show();

                $("#gameover").hide();
                // the maximum life set
                livesleft = 3;
                //      function which inserts the lives
                addHeart();

                $(this).html("Reset Game");

                startAction();
            }

        });

        $("#fruit1").mouseover(function () {
            score = score + 1;
            $("#score_value").html(score);
            $("#sound")[0].play();

            clearInterval(action);

            $("#fruit1").hide("explode", 300);

            setTimeout(startAction, 400);
        });


        //***********[ FUNCTIONS HERE ]*********

        function addHeart() {
            $("#lives").empty();
            for (i = 0; i < livesleft; i++) {
                $("#lives").append("❤");
            }
        }

        // funtion to set the fruits rollings
        function startAction() {
            $("#fruit1").show();
            // gets the random fruits
            chooseFruit();
            var placefruit = Math.round(520 * Math.random());
            //sets the random position of the fruits
            $("#fruit1").css({
                "left": placefruit,
                "top": -80
            });


            //         move fruit down 1 step every 10 ms
            step = 1;
            if (step >= 5) {
                step = -50;
            }
            action = setInterval(function () {
                step++;
                hit = $("#fruit1").position().top + step;
                $("#fruit1").css('top', hit);

                if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                    // check if lives left is not < 1
                    if (livesleft > 1) {
                        $("#fruit1").show();
                        // gets the random fruits
                        chooseFruit();
                        var placefruit = Math.round(520 * Math.random());
                        //sets the random position of the fruits
                        $("#fruit1").css({
                            "left": placefruit,
                            "top": -80
                        });

                        livesleft--;

                        addHeart();
                    } else {
                        $("#lives").hide();
                        $("#startReset").html("Start Game");
                        playing = false;

                        $("#gameover").css('display', 'block');
                        $("#gameover").html("<div>Game over!!</div><div>Your score is <span class='colorme'>" + score + "</span></div>");

                        stopAction();
                    }
                    //                clearInterval(action);
                } else {

                }
            }, 50);


        }

        function chooseFruit() {
            var chooseNum = Math.round(9 * Math.random());
            $("#fruit1").attr("src", "img/" + fruits[chooseNum] + ".ico");
        }

        function stopAction() {
            clearInterval(action);
            $("#fruit1").hide();
        }
    });
