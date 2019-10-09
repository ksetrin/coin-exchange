process.stdin.resume();
process.stdin.setEncoding('utf8');

function coinsMods () {
  return coins.map((coin) => sum % coin);
}

function getRes (i, j, mult) {
  if (i > sum || j > sum) {
    return null
  }
  var a = Math.floor(mult * j / i);
  var b = Math.floor(sum / i);
  var res = i * (b - a) + +j * mult;
  if (res > sum) {
    return getRes(i, j, mult + 1)
  } else if (res == sum) {
    return coins.map((c) => {
      if (c == i) {
        return `${i} x ${b - a}`
      } else if (c == j) {
        return `${j} x ${mult}`
      } else {
        return `${c} x 0`
      }
    })
  } else {
    return null;
  }
}

function showResult () {
  if (result) {
    process.stdout.write('YES' + '\n');
    result.forEach((r) => process.stdout.write(r + '\n'))
  } else {
    process.stdout.write('NO' + '\n');
  }
}

var sum = 0
var coins = [];
var result = null;

process.stdin.on('data', function (chunk) {
  var lines = chunk.toString().split('\n');

  sum = lines[0];
  lines.forEach(function(line, index) {
    if (index > 0 && index < lines.length-1 ) {
      coins.push(line)
    }
  });

  // process.stdout.write('Coins '+JSON.stringify(coins)+'\n');
  // process.stdout.write('Sum '+JSON.stringify(sum)+'\n');

  var checkArr = coinsMods();
  var index = checkArr.findIndex(c => c === 0 )
  if (index > -1) {
    result = coins.map((c, i) => {
      if (i === index) {
        return `${c} x ${Math.floor(sum / c)}`
      } else {
        return `${c} x 0`
      }
    })
    showResult()
    process.exit();
  }

  for (i = 0; i < coins.length; i++) {
    for (j = 0; j < coins.length; j++) {
      if (i >= j) continue;
      // process.stdout.write('coin ' + coins[i] + ' ' + coins[j] + '\n');
      result = getRes(coins[i], coins[j], 1)
      if (result) {
        showResult()
        process.exit();
      }
    }
  }
  showResult()
});
