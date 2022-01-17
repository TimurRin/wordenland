<?php
$TITLE = "wordle unleashed";
$VERSION = "0.2.3";
$DATE = "2021-01-17";
?>
<html>

<head>
    <title><?php
            echo $TITLE;
            ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: monospace;
            font-size: 2vmax;
            font-weight: bold;
            color: #DDDDDD;
            background-color: #161616;
            text-align: center;

        }

        a:link,
        a:visited,
        a:active {
            color: #FFC90E;
            text-decoration: none;
        }

        a:hover {
            color: #161616;
            background-color: #FFC90E;
            text-decoration: none;
        }

        .wordle-game {
            display: flex;
            flex-wrap: wrap;
        }

        .wordle-footer {
            font-size: 1vmax;
            padding: 20px;
            /* display: none; */
        }

        .wordle-section {
            flex: 100%;
        }

        @media only screen and (min-width: 768px) {

            .wordle-section {
                flex: 50%;
            }
        }

        #wordle-table {
            font-size: 5vmax;
        }

        .wordle-cell {
            padding: 0px 25px 10px;
            color: #808080;
        }

        .wordle-keyboard-key {
            font-family: monospace;
            font-weight: bold;
            font-size: 3vmax;
            border: none;
            background-color: #AFAFAF;
            padding: 1.5vmax 1vmax;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 2px;
        }

        @keyframes blink {
            50% {
                opacity: 0.0;
            }
        }

        .blink {
            animation: blink 1s step-start 0s infinite;
        }
    </style>

</head>

<body>
    <div class="wordle-header">
        <p><?php echo $TITLE; ?>, <span id="wordle-mode-name">...</span></p>
    </div>
    <div class="wordle-game">
        <div class="wordle-section" id="wordle-table">
        </div>
        <div class="wordle-section" id="wordle-keyboard">
        </div>
    </div>
    <div class="wordle-footer">
        <p>wordle unleashed <span title='<?php echo $DATE; ?>'><?php echo $VERSION; ?></span> by <a href="https://moziev.ru/">TimurRin</a></br>original <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by <a href="https://www.powerlanguage.co.uk/">powerlanguage</a></p>
    </div>

    <script type="text/javascript" src="wordle-table.js"></script>
    <script type="text/javascript" src="wordle-keyboard.js"></script>
    <script type="text/javascript" src="wordle-init.js"></script>
</body>

</html>