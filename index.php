<?php
$TITLE = "wordle remixed";
$VERSION = "0.0.1-alpha";
?>
<html>

<head>
    <title><?php
            echo $TITLE;
            ?></title>
    <style>
        body {
            font-family: monospace;
            font-size: 32px;
            font-weight: bold;
            color: #DDDDDD;
            background-color: #161616;
            text-align: center;

        }

        #wordle-table {
            font-size: 72px;
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

        .wordle-cell {
            /* background-color: hotpink; */
            padding: 0px 25px 10px;
            /* margin: 5px; */
            border-width: 4px;
            border-color: aquamarine;
            color: #808080;
        }
    </style>

</head>

<body>
    <div>
        <p><?php echo $TITLE; ?>, <span id="wordle-mode-name"></span></p>
    </div>
    <div>
        <div id="wordle-table">
        </div>
        <div id="wordle-keyboard">
        </div>
    </div>
    <div>
        <p>wordle remix <?php echo $VERSION; ?> by <a href="https://moziev.ru/">TimurRin</a> (2022)</br>original <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by <a href="https://www.powerlanguage.co.uk/">powerlanguage</a></p>
    </div>

    <script type="text/javascript" src="wordle-table.js"></script>
    <script type="text/javascript" src="wordle-keyboard.js"></script>
    <script type="text/javascript" src="wordle-init.js"></script>
</body>

</html>