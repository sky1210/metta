const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const Discord = require('discord.js');
const client = new Discord.Client();

const watercooldown = new Set();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//--------------------기본 명령어-----------------------
client.on('message', msg => {
  const msgsplit = msg.content.split(' ');
  connection.query(`SELECT * FROM user WHERE id = '${msg.author.id}'`, (err, rows) => {
    function command_execute () {
      if (msg.author.bot) return;
      if (msg.content === "메타야") {
        msg.channel.send("저 불렀어요?");
      };
      if (msg.content.startsWith("메타야") || msg.content.startsWith("ㅁ")) {
//--------------------정보-----------------------
        if (msgsplit[1] == '내정보') {
          const gold = rows[0].gold
          const crops1 = rows[0].crops1
          const crops2 = rows[0].crops2
          const crops3 = rows[0].crops3
          const crops4 = rows[0].crops4
          const crops5 = rows[0].crops5
          const seed1 = rows[0].seed1
          const seed2 = rows[0].seed2
          const seed3 = rows[0].seed3
          const seed4 = rows[0].seed4
          const seed5 = rows[0].seed5
          const energy = rows[0].energy
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${msg.author.tag}님의 정보`);
          embed.setColor("#AAAAAA");
          embed.setDescription(
`
**재산**
:moneybag:돈: ${gold}G
:rice:쌀: ${crops1}개(씨앗: ${seed1}개)
:french_bread:밀: ${crops2}개(씨앗: ${seed2}개)
:grapes:포도: ${crops3}개(씨앗: ${seed3}개)
:strawberry:딸기: ${crops4}(씨앗: ${seed4}개)
:blueberries:블루베리: ${crops5}개(씨앗: ${seed5}개)

**스탯**
:test_tube:기력: ${energy}
`
    );
          embed.setFooter(
`
디스코드 : https://discord.gg/VQSQVtKdyE
버전 : 1.1.0
 `
          );
          msg.channel.send(embed)
//--------------------구매-----------------------
        };
        if (msgsplit[1] === "구매") {
          if (msgsplit[2] !== "쌀" && msgsplit[2] !== "밀" && msgsplit[2] !== "포도" && msgsplit[2] !== "딸기" && msgsplit[2] !== "블루베리" && msgsplit[3] !== "씨앗") {
            msg.channel.send(`
구매할 품목을 정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
            );
          } else if (msgsplit[4] === undefined) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          } else if (isNaN(msgsplit[4])) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          };
          if (msgsplit[2] === "쌀" && msgsplit[3] === "씨앗") {
            const gold = rows[0].gold;
            const seed1 = rows[0].seed1;
              if (gold < msgsplit[4] * 50) {
                msg.channel.send("자신의 돈보다 높은 금액을 부르면 안돼지!");
                return;
              };
              connection.query(`update user set gold = ${gold - eval(msgsplit[4] * 50 )} where id = ${msg.author.id}`);
              connection.query(`update user set seed1 = ${seed1 + eval(msgsplit[4])} where id = ${msg.author.id}`);
              msg.channel.send("쌀 씨앗을 " + msgsplit[4] + "개만큼 구매했어요!");
          } else if (msgsplit[2] === "밀" && msgsplit[3] === "씨앗") {
            const gold = rows[0].gold;
            const seed2 = rows[0].seed2;
              if (gold < msgsplit[4] * 30) {
                msg.channel.send("자신의 돈보다 높은 금액을 부르면 안돼지!");
                return;
              };
              connection.query(`update user set gold = ${gold - eval(msgsplit[4] * 30 )} where id = ${msg.author.id}`);
              connection.query(`update user set seed2 = ${seed2 + eval(msgsplit[4])} where id = ${msg.author.id}`);
              msg.channel.send("밀 씨앗을 " + msgsplit[4] + "개만큼 구매했어요!");
          } else if (msgsplit[2] === "포도" && msgsplit[3] === "씨앗") {
            const gold = rows[0].gold;
            const seed3 = rows[0].seed3;
              if (gold < msgsplit[4] * 100) {
                msg.channel.send("자신의 돈보다 높은 금액을 부르면 안돼지!");
                return;
              };
              connection.query(`update user set gold = ${gold - eval(msgsplit[4] * 100 )} where id = ${msg.author.id}`);
              connection.query(`update user set seed3 = ${seed3 + eval(msgsplit[4])} where id = ${msg.author.id}`);
              msg.channel.send("포도 씨앗을 " + msgsplit[4] + "개만큼 구매했어요!");
          } else if (msgsplit[2] === "딸기" && msgsplit[3] === "씨앗") {
            const gold = rows[0].gold;
            const seed4 = rows[0].seed4;
              if (gold < msgsplit[4] * 70) {
                msg.channel.send("자신의 돈보다 높은 금액을 부르면 안돼지!");
                return;
              };
              connection.query(`update user set gold = ${gold - eval(msgsplit[4] * 70 )} where id = ${msg.author.id}`);
              connection.query(`update user set seed4 = ${seed4 + eval(msgsplit[4])} where id = ${msg.author.id}`);
              msg.channel.send("딸기 씨앗을 " + msgsplit[4] + "개만큼 구매했어요!");
          } else if (msgsplit[2] === "블루베리" && msgsplit[3] === "씨앗") {
            const gold = rows[0].gold;
            const seed5 = rows[0].seed5;
              if (gold < msgsplit[4] * 90) {
                msg.channel.send("자신의 돈보다 높은 금액을 부르면 안돼지!");
                return;
              };
              connection.query(`update user set gold = ${gold - eval(msgsplit[4] * 90 )} where id = ${msg.author.id}`);
              connection.query(`update user set seed3 = ${seed5 + eval(msgsplit[4])} where id = ${msg.author.id}`);
              msg.channel.send("블루베리 씨앗을 " + msgsplit[4] + "개만큼 구매했어요!");
          };
        };
//--------------------판매-----------------------
        if (msgsplit[1] == "판매") {
          if (msgsplit[2] !== "쌀" && msgsplit[2] !== "밀" && msgsplit[2] !== "포도" && msgsplit[2] !== "딸기" && msgsplit[2] !== "블루베리") {
            msg.channel.send(`
판매할 품목을 정해 주세요
\`\`\`판매 + [농작물] + [개수]\`\`\`
`
            );
          } else if (msgsplit[3] === undefined) {
            msg.channel.send(
`
개수를 지정해 주세요
\`\`\`판매 + [농작물] + [개수]\`\`\`
    `
);
            return;
          } else if (isNaN(msgsplit[3])) {
            msg.channel.send(
`
개수를 지정해 주세요
\`\`\`판매 + [농작물] + [개수]\`\`\`
`
);
            return;
          };
          if (msgsplit[2] == "쌀") {
            const crops1 = rows[0].crops1;
            const gold = rows[0].gold;
            if (crops1 < msgsplit[3]) {
              msg.channel.send("자신의 농작물보다 높은 개수를 부르면 안돼지!");
              return;
            };
            connection.query(`update user set gold = ${gold + eval(msgsplit[3] * 230)} where id = ${msg.author.id}`);
            connection.query(`update user set crops1 = ${crops1 - eval(msgsplit[3])} where id = ${msg.author.id}`);
            msg.channel.send(`쌀을 ${msgsplit[3]}개만큼 판매했어요!`);
          } else if (msgsplit[2] == "밀") {
            const crops2 = rows[0].crops2;
            const gold = rows[0].gold;
            if (crops2 < msgsplit[3]) {
              msg.channel.send("자신의 농작물보다 높은 개수를 부르면 안돼지!");
              return;
            };
            connection.query(`update user set gold = ${gold + eval(msgsplit[3] * 70)} where id = ${msg.author.id}`);
            connection.query(`update user set crops2 = ${crops2 - eval(msgsplit[3])} where id = ${msg.author.id}`);
            msg.channel.send(`밀을 ${msgsplit[3]}개만큼 판매했어요!`);
          } else if (msgsplit[2] == "포도") {
            const crops3 = rows[0].crops3;
            const gold = rows[0].gold;
            if (crops3 < msgsplit[3]) {
              msg.channel.send("자신의 농작물보다 높은 개수를 부르면 안돼지!");
              return;
            };
            connection.query(`update user set gold = ${gold + eval(msgsplit[3] * 600)} where id = ${msg.author.id}`);
            connection.query(`update user set crops3 = ${crops3 - eval(msgsplit[3])} where id = ${msg.author.id}`);
            msg.channel.send(`포도를 ${msgsplit[3]}개만큼 판매했어요!`);
          } else if (msgsplit[2] == "딸기") {
            const crops4 = rows[0].crops4;
            const gold = rows[0].gold;
            if (crops4 < msgsplit[3]) {
              msg.channel.send("자신의 농작물보다 높은 개수를 부르면 안돼지!");
              return;
            };
            connection.query(`update user set gold = ${gold + eval(msgsplit[3] * 300)} where id = ${msg.author.id}`);
            connection.query(`update user set crops4 = ${crops4 - eval(msgsplit[3])} where id = ${msg.author.id}`);
            msg.channel.send(`딸기를 ${msgsplit[3]}개만큼 판매했어요!`);
          } else if (msgsplit[2] == "블루베리") {
            const crops5 = rows[0].crops5;
            const gold = rows[0].gold;
            if (crops5 < msgsplit[3]) {
              msg.channel.send("자신의 농작물보다 높은 개수를 부르면 안돼지!");
              return;
            };
            connection.query(`update user set gold = ${gold + eval(msgsplit[3] * 550)} where id = ${msg.author.id}`);
            connection.query(`update user set crops5 = ${crops5 - eval(msgsplit[3])} where id = ${msg.author.id}`);
            msg.channel.send(`포도을 ${msgsplit[3]}개만큼 판매했어요!`);
          };
        };
//--------------------물주기-----------------------
        if (msgsplit[1]  == "물주기") {
          const watercount = rows[0].watercount
          const plant = rows[0].plant
          const energy = rows[0].energy
          if (watercooldown.has(msg.author.id)) {
            msg.channel.send("물주기는 5분에 한번만 가능해요!");
          } else {
            if (plant == 0) {
              msg.channel.send("어라? 아직 작물을 안 심은거 같은데?")
            } else if (energy < 50) {
              msg.channel.send("기력이 부족해!");
            };
            if (plant == 1) {
              if (watercount < 5) {
                connection.query(`update user set energy = ${energy - 50} where id = ${msg.author.id}`);
                connection.query(`update user set watercount = ${watercount +1} where id = ${msg.author.id}`);
                msg.channel.send(`물주기를 완료했어요! ${4 - watercount}번 남았네요!(기력 50 소모)`);
                watercooldown.add(msg.author.id);
                setTimeout(() => {
                  watercooldown.delete(msg.author.id);
                }, 300000);
              } else {
                msg.channel.send("어라? 다 자란 거 같은데? 수확해보자!");
              };
            };
            if (plant == 2) {
              if (watercount < 2) {
                connection.query(`update user set energy = ${energy - 50} where id = ${msg.author.id}`);
                connection.query(`update user set watercount = ${watercount +1} where id = ${msg.author.id}`);
                msg.channel.send(`물주기를 완료했어요! ${1 - watercount}번 남았네요!(기력 50 소모)`);
                watercooldown.add(msg.author.id);
                setTimeout(() => {
                  watercooldown.delete(msg.author.id);
                }, 300000);
              } else {
                msg.channel.send("어라? 다 자란 거 같은데? 수확해보자!");
              };
            };
            if (plant == 3) {
              if (watercount < 10) {
                connection.query(`update user set energy = ${energy - 50} where id = ${msg.author.id}`);
                connection.query(`update user set watercount = ${watercount +1} where id = ${msg.author.id}`);
                msg.channel.send(`물주기를 완료했어요! ${9 - watercount}번 남았네요!(기력 50 소모)`);
                watercooldown.add(msg.author.id);
                setTimeout(() => {
                  watercooldown.delete(msg.author.id);
                }, 300000);
              } else {
                msg.channel.send("어라? 다 자란 거 같은데? 수확해보자!");
              };
            };
            if (plant == 4) {
              if (watercount < 7) {
                connection.query(`update user set energy = ${energy - 50} where id = ${msg.author.id}`);
                connection.query(`update user set watercount = ${watercount +1} where id = ${msg.author.id}`);
                msg.channel.send(`물주기를 완료했어요! ${6 - watercount}번 남았네요!(기력 50 소모)`);
                watercooldown.add(msg.author.id);
                setTimeout(() => {
                  watercooldown.delete(msg.author.id);
                }, 300000);
              } else {
                msg.channel.send("어라? 다 자란 거 같은데? 수확해보자!");
              };
            };
            if (plant == 5) {
              if (watercount < 9) {
                connection.query(`update user set energy = ${energy - 50} where id = ${msg.author.id}`);
                connection.query(`update user set watercount = ${watercount +1} where id = ${msg.author.id}`);
                msg.channel.send(`물주기를 완료했어요! ${8 - watercount}번 남았네요!(기력 50 소모)`);
                watercooldown.add(msg.author.id);
                setTimeout(() => {
                  watercooldown.delete(msg.author.id);
                }, 300000);
              } else {
                msg.channel.send("어라? 다 자란 거 같은데? 수확해보자!");
              };
            };
          };
        };
//--------------------농사-----------------------
        if (msgsplit[1] == "농사") {
          if (msgsplit[2] !== "쌀" && msgsplit[2] !== "밀" && msgsplit[2] !== "포도" && msgsplit[2] !== "딸기" && msgsplit[2] !== "블루베리" && msgsplit[3] !== "씨앗") {
            msg.channel.send(`
            농사할 씨앗을 정해 주세요
            \`\`\`구매 + [농작물] + [개수]\`\`\`
            `
            );
          } else if (msgsplit[4] === undefined) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          } else if (isNaN(msgsplit[4])) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          } else if (msgsplit[4] == "0") {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          };
          if (msgsplit[2] === "쌀" && msgsplit[3] === "씨앗") {
            const plant = rows[0].plant;
            const energy = rows[0].energy;
            const seed1 = rows[0].seed1;
            if (plant != 0) {
              msg.channel.send("이미 다른 작물을 심었어!");
              return;
            } else if (seed1 < msgsplit[4]) {
              msg.channel.send("자신의 씨앗보다 더 많은 씨앗을 부르면 안돼지!");
            } else if (energy < 100) {
              msg.channel.send("기력이 부족해!");
            } else {
              connection.query(`update user set plantcount = ${msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set seed1 = ${seed1 - msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
              connection.query(`update user set plant = 1 where id = ${msg.author.id}`);
              msg.channel.send(`성공적으로 씨앗 ${msgsplit[4]}개를 심었어!(기력 100 소모)`)
            };
          } else if (msgsplit[2] === "밀" && msgsplit[3] === "씨앗") {
            const plant = rows[0].plant;
            const energy = rows[0].energy;
            const seed2 = rows[0].seed2;
            if (plant != 0) {
              msg.channel.send("이미 다른 작물을 심었어!");
              return;
            } else if (seed2 < msgsplit[4]) {
              msg.channel.send("자신의 씨앗보다 더 많은 씨앗을 부르면 안돼지!");
            } else if (energy < 100) {
              msg.channel.send("기력이 부족해!");
            } else {
              connection.query(`update user set plantcount = ${msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set seed2 = ${seed2 - msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
              connection.query(`update user set plant = 2 where id = ${msg.author.id}`);
              msg.channel.send(`성공적으로 씨앗 ${msgsplit[4]}개를 심었어!(기력 100 소모)`);
            };
          } else if (msgsplit[2] === "포도" && msgsplit[3] === "씨앗") {
            const plant = rows[0].plant;
            const energy = rows[0].energy;
            const seed3 = rows[0].seed3;
            if (plant != 0) {
              msg.channel.send("이미 다른 작물을 심었어!");
              return;
            } else if (seed3 < msgsplit[4]) {
              msg.channel.send("자신의 씨앗보다 더 많은 씨앗을 부르면 안돼지!");
            } else if (energy < 100) {
              msg.channel.send("기력이 부족해!");
            } else {
              connection.query(`update user set plantcount = ${msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set seed3 = ${seed3 - msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
              connection.query(`update user set plant = 3 where id = ${msg.author.id}`);
              msg.channel.send(`성공적으로 씨앗 ${msgsplit[4]}개를 심었어!(기력 100 소모)`);
            };
          } else if (msgsplit[2] === "딸기" && msgsplit[3] === "씨앗") {
            const plant = rows[0].plant;
            const energy = rows[0].energy;
            const seed4 = rows[0].seed4;
            if (plant != 0) {
              msg.channel.send("이미 다른 작물을 심었어!");
              return;
            } else if (seed4 < msgsplit[4]) {
              msg.channel.send("자신의 씨앗보다 더 많은 씨앗을 부르면 안돼지!");
            } else if (energy < 100) {
              msg.channel.send("기력이 부족해!");
            } else {
              connection.query(`update user set plantcount = ${msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set seed4 = ${seed4 - msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
              connection.query(`update user set plant = 4 where id = ${msg.author.id}`);
              msg.channel.send(`성공적으로 씨앗 ${msgsplit[4]}개를 심었어!(기력 100 소모)`);
            };
          } else if (msgsplit[2] === "블루베리" && msgsplit[3] === "씨앗") {
            const plant = rows[0].plant;
            const energy = rows[0].energy;
            const seed5 = rows[0].seed5;
            if (plant != 0) {
              msg.channel.send("이미 다른 작물을 심었어!");
              return;
            } else if (seed5 < msgsplit[4]) {
              msg.channel.send("자신의 씨앗보다 더 많은 씨앗을 부르면 안돼지!");
            } else if (energy < 100) {
              msg.channel.send("기력이 부족해!");
            } else {
              connection.query(`update user set plantcount = ${msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set seed5 = ${seed5 - msgsplit[4]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
              connection.query(`update user set plant = 5 where id = ${msg.author.id}`);
              msg.channel.send(`성공적으로 씨앗 ${msgsplit[4]}개를 심었어!(기력 100 소모)`)
            };
          };
        };
//--------------------섭취-----------------------
        if (msgsplit[1] == "섭취") {
          const crops1 = rows[0].crops1;
          const crops2 = rows[0].crops2;
          const crops3 = rows[0].crops3;
          const crops4 = rows[0].crops4;
          const crops5 = rows[0].crops5;
          const energy = rows[0].energy;
          if (msgsplit[2] !== "쌀" && msgsplit[2] !== "밀" && msgsplit[2] !== "포도" && msgsplit[2] !== "딸기" && msgsplit[2] !== "블루베리" && msgsplit[3] !== "씨앗") {
            msg.channel.send(`
섭취할 음식을 정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
            );
          } else if (msgsplit[3] === undefined) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          } else if (isNaN(msgsplit[3])) {
            msg.channel.send(`
개수를 지정해 주세요
\`\`\`구매 + [농작물] + [개수]\`\`\`
`
);
            return;
          } else if (msgsplit[2] == "쌀") {
            if (crops1 < msgsplit[3]) {
              msg.channel.send("자신의 음식보다 더 많은 양을 먹으면 안돼지!");
            } else {
              connection.query(`update user set crops1 = ${crops1 - msgsplit[3]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy + 70 * msgsplit[3]} where id = ${msg.author.id}`);
              msg.channel.send(`쌀 ${msgsplit[3]}개를 먹었어요!`);
            };
          } else if (msgsplit[2] == "밀") {
            if (crops2 < msgsplit[3]) {
              msg.channel.send("자신의 음식보다 더 많은 양을 먹으면 안돼지!");
            } else {
              connection.query(`update user set crops2 = ${crops2 - msgsplit[3]} where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy + 30 * msgsplit[3]} where id = ${msg.author.id}`);
              msg.channel.send(`밀 ${msgsplit[3]}개를 먹었어요!`);
            };
        } else if (msgsplit[2] == "포도") {
          if (crops3 < msgsplit[3]) {
            msg.channel.send("자신의 음식보다 더 많은 양을 먹으면 안돼지!");
          } else {
            connection.query(`update user set crops3 = ${crops3 - msgsplit[3]} where id = ${msg.author.id}`);
            connection.query(`update user set energy = ${energy + 90 * msgsplit[3]} where id = ${msg.author.id}`);
            msg.channel.send(`포도 ${msgsplit[3]}개를 먹었어요!`);
          };
        } else if (msgsplit[2] == "딸기") {
          if (crops4 < msgsplit[3]) {
            msg.channel.send("자신의 음식보다 더 많은 양을 먹으면 안돼지!");
          } else {
            connection.query(`update user set crops4 = ${crops4 - msgsplit[3]} where id = ${msg.author.id}`);
            connection.query(`update user set energy = ${energy + 30 * msgsplit[3]} where id = ${msg.author.id}`);
            msg.channel.send(`딸기 ${msgsplit[3]}개를 먹었어요!`);
        };
        }  else if (msgsplit[2] == "블루베리") {
          if (crops5 < msgsplit[3]) {
            msg.channel.send("자신의 음식보다 더 많은 양을 먹으면 안돼지!");
          } else {
            connection.query(`update user set crops5 = ${crops5 - msgsplit[3]} where id = ${msg.author.id}`);
            connection.query(`update user set energy = ${energy + 80 * msgsplit[3]} where id = ${msg.author.id}`);
            msg.channel.send(`블루베리 ${msgsplit[3]}개를 먹었어요!`);
          };
        };
        };
//--------------------수확-----------------------
        if (msgsplit[1] == "수확") {
          const plant = rows[0].plant;
          const watercount = rows[0].watercount;
          const plantcount = rows[0].plantcount;
          const energy = rows[0].energy;
          if (plant == 0) {
            msg.channel.send("어라? 농작물을 안 심었잖아!");
          };
          if (plant == 1) {
            if (watercount < 5) {
              msg.channel.send("어라? 농작물이 다 안자랐잖아!");
            } else if (watercount == 5) {
              msg.channel.send(`성공적으로 쌀 ${plantcount}개를 수확했어요!(기력 100 소모)`)
              connection.query(`update user set crops1 = ${plantcount} where id = ${msg.author.id}`);
              connection.query(`update user set plantcount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set plant = 0 where id = ${msg.author.id}`);
              connection.query(`update user set watercount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
            };
          };
          if (plant == 2) {
            if (watercount < 2) {
              msg.channel.send("어라? 농작물이 다 안자랐잖아!");
            } else if (watercount == 2) {
              msg.channel.send(`성공적으로 밀 ${plantcount}개를 수확했어요!(기력 100 소모)`)
              connection.query(`update user set crops2 = ${plantcount} where id = ${msg.author.id}`);
              connection.query(`update user set plantcount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set plant = 0 where id = ${msg.author.id}`);
              connection.query(`update user set watercount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
            };
          };
          if (plant == 3) {
            if (watercount < 10) {
              msg.channel.send("어라? 농작물이 다 안자랐잖아!");
            } else if (watercount == 5) {
              msg.channel.send(`성공적으로 포도 ${plantcount}개를 수확했어요!(기력 100 소모)`)
              connection.query(`update user set crops3 = ${plantcount} where id = ${msg.author.id}`);
              connection.query(`update user set plantcount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set plant = 0 where id = ${msg.author.id}`);
              connection.query(`update user set watercount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
            };
          };
          if (plant == 4) {
            if (watercount < 5) {
              msg.channel.send("어라? 농작물이 다 안자랐잖아!");
            } else if (watercount == 7) {
              msg.channel.send(`성공적으로 딸기 ${plantcount}개를 수확했어요!(기력 100 소모)`)
              connection.query(`update user set crops4 = ${plantcount} where id = ${msg.author.id}`);
              connection.query(`update user set plantcount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set plant = 0 where id = ${msg.author.id}`);
              connection.query(`update user set watercount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
            };
          };
          if (plant == 5) {
            if (watercount < 9) {
              msg.channel.send("어라? 농작물이 다 안자랐잖아!");
            } else if (watercount == 5) {
              msg.channel.send(`성공적으로 블루베리 ${plantcount}개를 수확했어요!(기력 100 소모)`)
              connection.query(`update user set crops5 = ${plantcount} where id = ${msg.author.id}`);
              connection.query(`update user set plantcount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set plant = 0 where id = ${msg.author.id}`);
              connection.query(`update user set watercount = 0 where id = ${msg.author.id}`);
              connection.query(`update user set energy = ${energy - 100} where id = ${msg.author.id}`);
            };
          };
        };
//--------------------명령어-----------------------
        if (msgsplit[1] == "명령어") {
          const embed = new Discord.MessageEmbed();
          embed.setTitle('메타의 명령어');
          embed.setColor("#AAAAAA");
          embed.addFields(
            {name: "메타야 {할말}", value: "메타가 답변을 해줍니다! 아직 명령어가 많진 않지만...", inline: false},
            {name: "메타야 정보", value: "자신의 정보를 알 수 있습니다!", inline: false},
            {name: "메타야 상점", value: "상점으로 이동합니다!", inline: false},
            {name: "메타야 구매 [씨앗] [개수]", value: "씨앗을 구매할 수 있습니다!", inline: false},
            {name: "메타야 판매 [농작물] [개수]", value: "가지고 있는 농작물을 팔 수 있습니다!", inline: false},
            {name: "메타야 농사 [씨앗] [개수]", value: "가지고 있는 씨앗을 심을 수 있습니다!", inline: false},
            {name: "메타야 물주기", value: "5분마다 물을 주지 않으면 농작물이 자라지 않는데요!", inline: false},
            {name: "메타야 수확", value: "농작물을 수확할 수 있습니다", inline: false},
            {name: "메타야 섭취", value: "음식을 먹을 수 있습니다!", inline: false}
          );
          embed.setFooter(
`
[] => 꼭 적어야 하는 내용
{} => 적어도 되고 안적어도 되는 내용
디스코드 : https://discord.gg/VQSQVtKdy
버전 : 1.1.0
`);
          msg.channel.send(embed)
        };
//--------------------상점-----------------------
        if (msgsplit[1] === "상점") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#6745ff");
          embed.setTitle("상점")
          embed.addFields(
              {name: "쌀 씨앗", value: `
가격:50G
자라는데 최소 25분 소요
판매가 : 230G
기력 70 회복
`, inline: false},
              {name: "밀 씨앗", value: `
가격:30G
자라는데 최소 10분 소요
판매가 : 70G
기력 30 회복
`, inline: false},
              {name: "포도 씨앗", value: `
가격:100G
자라는데 최소 50분 소요
판매가 : 600G
기력 90 회복
`, inline: false},
              {name: "딸기 씨앗", value: `
가격:70G
자라는데 최소 35분 소요
판매가 : 300G
기력 30 회복
`, inline: false},
              {name: "블루베리 씨앗", value: `
가격:90G
자라는데 최소 45분 소요
판매가 : 550G
기력 80 회복
`, inline: false},
          )
          embed.setFooter(`
디스코드 : https://discord.gg/VQSQVtKdyE
버전 : 1.1.0
`);
          msg.channel.send(embed);
        };
      };
    };
//--------------------등록-----------------------
    let sql;
    if (rows == undefined) {
      sql = `INSERT INTO user (id, gold, crops1, crops2, crops3, crops4, crops5, seed1, seed2, seed3, seed4, seed5, plant, watercount, plantcount, energy) VALUES ('${msg.author.id}', 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000)`
      connection.query(sql,console.log);
    } else {
      command_execute();
    };
  });
  try {} catch (err) { console.error(err) }
});

client.login("Token");
