<?php

$num = 2;
$foo = $num . " be";
$bar = "or not " . "to be";

echo $foo ." " . $bar;
echo $num * $num;
echo "\n";

$arr = [1,1,2,3,5,8];

$arr2 = [
    "first" => "Tom",
    "second" => "Bipin",
    "best" => "DS"
];

if(true) {
    echo "TRUE \n";
} else {
    echo "FALSE \n";
}
while (true) {
    break;
}

echo "<ul>";
foreach ($arr2 as $key => $val) {
    echo "<li>".$key." is ".$val."</li>";
}
echo "</ul>";

echo json_encode($arr);
echo json_encode(
    $arr2,
    JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
);

// constants: are upper snake case SNAKE_CASE
// variables are lowercase
// PHP & JS: camelCase
// class names: PascalCase
// kebab-case