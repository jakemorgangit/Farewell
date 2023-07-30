const bootDiv = document.getElementById('bootSequence');
const sqlDiv = document.getElementById('sqlSequence');
const logo = document.getElementById('logo');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let currentDatetime = new Date();
let formattedDate = currentDatetime.toDateString();
let formattedTime = currentDatetime.toLocaleTimeString();

const typeWriter = async (sqlLine, speed) => {
  return new Promise((resolve, reject) => {
    let i = 0;
    let mistypes = 0;
    const txt = sqlLine.text;
    const isHtml = sqlLine.isHTML || false;
    const isTyped = sqlLine.typed || false;
    const isMistyped = sqlLine.isMistyped || false;
    const mistypeDelay = sqlLine.mistypeDelay || 250; // Default delay before correcting a mistake
    const isSqlPrompt = sqlLine.sqlPrompt || false;
    const isBashPrompt = sqlLine.bashPrompt || false;
    const typingDelay = sqlLine.typingDelay || 0;
  
    // Function to get a random typing speed between a range
    const getRandomSpeed = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    // Function to generate a common typographical error for a given character
    const getTypo = (char) => {
      const keyboard = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm',
      ];
      let typo = char;
      keyboard.some((row) => {
        const index = row.indexOf(char);
        if (index !== -1) {
          const direction = Math.random() > 0.5 ? 1 : -1;
          const neighborIndex = index + direction;
          // Check if the neighbor character exists
          if (neighborIndex >= 0 && neighborIndex < row.length) {
            typo = row[neighborIndex];
            return true; // Stop the loop once the typo has been found
          }
        }
        return false; // Continue the loop
      });
      return typo;
    };

    // Function to get a random number of mistypes between a range
    const getRandomMistypes = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const maxMistypes = isMistyped ? getRandomMistypes(2, 4) : 0;

    if (isHtml && txt === '<br>') {
      bootDiv.appendChild(document.createElement('br'));
      bootDiv.scrollTop = bootDiv.scrollHeight;
      resolve();
    } else {
      const line = document.createElement('div');
      bootDiv.appendChild(line);
      bootDiv.scrollTop = bootDiv.scrollHeight;
	  
	  if (isBashPrompt) {
        line.textContent += "root@test-server:~$ ";
      }	  
	  
      if (isSqlPrompt) {
        line.textContent += "SQL> ";
      }

      if (isHtml) {
        line.innerHTML += txt;
        bootDiv.scrollTop = bootDiv.scrollHeight;
        resolve();
      } else if (isTyped) {
        setTimeout(() => { // delay before typing starts
          const typeCharacter = () => {
            if (i < txt.length) {
              if (mistypes < maxMistypes && Math.random() < 0.05) {
                const typo = getTypo(txt.charAt(i));
                line.textContent += typo;
                bootDiv.scrollTop = bootDiv.scrollHeight + (0.1 * bootDiv.clientHeight);
                setTimeout(() => {
                  // Delete the typo one by one
                  const deleteTypo = () => {
                    if (line.textContent.endsWith(typo)) {
                      line.textContent = line.textContent.slice(0, -1);
                      bootDiv.scrollTop = bootDiv.scrollHeight + (0.1 * bootDiv.clientHeight);
                      setTimeout(deleteTypo, mistypeDelay);
                    } else {
                      line.textContent += txt.charAt(i);
                      i++;
                      mistypes++;
                      bootDiv.scrollTop = bootDiv.scrollHeight + (0.1 * bootDiv.clientHeight);
                      setTimeout(typeCharacter, getRandomSpeed(5, 65));  // adjusted typing speed here
                    }
                  };
                  deleteTypo();
                }, mistypeDelay);
              } else {
                line.textContent += txt.charAt(i);
                i++;
                bootDiv.scrollTop = bootDiv.scrollHeight + (0.1 * bootDiv.clientHeight);
                setTimeout(typeCharacter, getRandomSpeed(5, 65));  // adjusted typing speed here
              }
            } else {
              resolve();
            }
          };
          // Call the function initially
          typeCharacter();
        }, typingDelay);
      } else {
        line.textContent += txt;
        bootDiv.scrollTop = bootDiv.scrollHeight;
        resolve();
      }
    }
  });
};







const bootSequence = [
    { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 0 },
	{ text: "Copyright (C) 1984-95, Award Software. Inc", delay: 2000 },
	{ text: '<br>', delay: 0, isHTML: true },
	{ text: "Version JM-1984", delay: 2000 },
	{ text: '<br>', delay: 0, isHTML: true },
    { text: "INTEL(R) 80486DX-2 CPU at 66 MHz", delay: 1500 },
    { text: "Memory Test:&nbsp;&nbsp;&nbsp;&nbsp;", delay: 3000, isMemTest: true , isHTML: true   },
	{ text: '<br>', delay: 0, isHTML: true },
	{ text: "Award Plug and Play BIOS Extension v1.0A", delay: 100 },
	{ text: "Copyright (C) 1984-95, Award Software. Inc", delay: 0 },
    { text: "Detecting IDE Drives...", delay: 1500 },
    { text: "&nbsp;&nbsp;&nbsp;&nbsp;Primary Master:&nbsp;&nbsp;&nbsp;&nbsp;..... IBM-DTTA-351010", delay: 1200, isHTML: true  },
    { text: "&nbsp;&nbsp;&nbsp;&nbsp;Primary Slave:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..... None", delay: 750, isHTML: true   },
    { text: "&nbsp;&nbsp;&nbsp;&nbsp;Secondary Master:&nbsp;&nbsp;..... None", delay: 550, isHTML: true   },
    { text: "&nbsp;&nbsp;&nbsp;&nbsp;Secondary Slave:&nbsp;&nbsp;&nbsp..... None", delay: 550, isHTML: true   },
	{ text: '<br>', delay: 0, isHTML: true },
	{ text: "Turbo Button:", delay: 2550 },
    { text: '<span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACTIVATED</span>', delay: 1550, isHTML: true },
	{ text: '<br>', delay: 0, isHTML: true },
    { text: "Starting MS-DOS...", id: 'msdos', delay: 5000 }
];

const linuxSequence = [
    { text: "Starting Linux...", delay: 200 },
    { text: "Loading, please wait...", delay: 3000 },
    { text: "Mounting filesystems...", delay: 300 },
    { text: "Starting system log daemon...", delay: 300 },
    { text: "Starting network services...", delay: 300 },
    { text: "Starting ssh server...", delay: 300 },
    { text: "Root auto-login:", delay: 300 },
	{ text: '<br>', delay: 500, isHTML: true }
];



const sqlSequence = [
    { text: "sqlplus proactuser/verysecurepassword@proactdbsvr1:1521/ORCL" ,typingDelay: 3000, bashPrompt: true ,isMistyped: true, typed: true, delay: 100 },
    { text: '<br>', delay: 0, isHTML: true },  
    { text: `SQL*Plus: Release 19.0.0.0.0 - Production on ${formattedDate} ${formattedTime}` , delay: 100 },
    { text: "Version 19.17.0.0.0" ,  delay: 100 },
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "Copyright (c) 1982, 2022, Oracle.  All rights reserved." ,  delay: 100 },
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "Connected to: ", delay: 500 },
    { text: "Oracle Database 19c Standard Edition 2 Release 19.0.0.0.0 - Production",  delay: 100 },
    { text: "Version 19.17.0.0.0",  delay: 500 },
    { text: '<br>', delay: 0, isHTML: true },        
    { text: "DESCRIBE Jake", typingDelay: 2000, sqlPrompt: true, typed: true, delay: 1000 },
    { text: '<br>', delay: 0, isHTML: true },    
	{ text: "Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Null?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type", delay: 100, isHTML: true },    
	{ text: "------------------------- ----------- ----------", delay: 100 },    
	{ text: "FAREWELL	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;				NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;VARCHAR2(4000)", isHTML: true, delay: 25 },
	{ text: "STARTDATE	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;						NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;TIMESTAMP", isHTML: true, delay: 25 },    
	{ text: "ENDDATE	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;TIMESTAMP", isHTML: true, delay: 25 },        
	{ text: "LINUX_OR_WINDOWS	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;														NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;VARCHAR2(7)", isHTML: true, delay: 25 },
	{ text: "LOVES_TRON_YN	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;											NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;NUMBER(1)", isHTML: true, delay: 25 },
	{ text: "OWNED_SEGA_MEGADRIVE	&nbsp;&nbsp;&nbsp;&nbsp;																			NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;NUMBER(1)", isHTML: true, delay: 25 },
	{ text: "FAVORITE_DOOM_LEVEL	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;																		NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;VARCHAR2(255)", isHTML: true, delay: 25 },
	{ text: "PI_MEMORIZED_TO	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;													NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;NUMBER(1)", isHTML: true, delay: 25 },
	{ text: "BEST_TNMT_TURTLE	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;														NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;VARCHAR2(255)", isHTML: true, delay: 25 },
	{ text: "HAD_CRUSH_ON_LARA_CROFT	&nbsp;																							NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;NUMBER(1)", isHTML: true, delay: 25 },
	{ text: "QTY_FLOPPY_DISKS_OWNED	&nbsp;&nbsp;																						NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;NUMBER", isHTML: true, delay: 25 },    
	{ text: "IMAGE	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	NOT NULL&nbsp;&nbsp;&nbsp;&nbsp;CLOB", isHTML: true, delay: 25 },
    { text: '<br>', delay: 0, isHTML: true }, 
	
	
    { text: "Select TO_Char(Startdate, 'yyyy-mm-dd') FROM Jake;" ,isMistyped: true, typingDelay: 5000, sqlPrompt: true, typed: true, delay: 500 },
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "STARTDATE", delay: 0, isHTML: true }, 
    { text: "----------", delay: 0, isHTML: true }, 
    { text: "2020-12-09", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },   
    { text: "1 row selected", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },  
	
	
    { text: "SeleCT to_CHAR(ENDdATE, 'yyyy-mM-DD') FROM Jake;" ,isMistyped: true, typingDelay: 2000, sqlPrompt: true, typed: true, delay: 500 },
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "ENDDATE", delay: 0, isHTML: true }, 
    { text: "----------", delay: 0, isHTML: true }, 
    { text: "2023-08-11", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },   
    { text: "1 row selected", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },  


    { text: "select Round(enddatE - Startdate) AS Days_At_Proact FROM Jake;" ,isMistyped: true, typingDelay: 2000, sqlPrompt: true, typed: true, delay: 500 },
    { text: '<br>', delay: 0, isHTML: true },  
    { text: "DAYS_AT_PROACT", delay: 0, isHTML: true }, 
    { text: "--------------", delay: 0, isHTML: true }, 	
    { text: "972", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },   
    { text: "1 row selected", delay: 0, isHTML: true }, 
    { text: '<br>', delay: 0, isHTML: true },  

	{ text: "set pages 50 lines 70" , typingDelay: 2000, sqlPrompt: true, typed: true, delay: 1000 },
    { text: "SELECT farewell FROM Jake;" , typingDelay: 4000, sqlPrompt: true, typed: true, delay: 1000 },
    { text: '<br>', delay: 0, isHTML: true },    
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "FAREWELL", delay: 0, isHTML: true }, 
    { text: "------------------------------------------------------", delay: 0, isHTML: true }, 
	
    { text: "If you\'re reading this, it\'s not because a database is down", typed: true, delay: 100 ,isMistyped: true,},
	{ text: "or we\'re about to hit our storage limit.", typed: true, delay: 200 ,isMistyped: true,},
    { text: "In fact, it\'s the opposite ... ", typed: true, delay: 500 ,isMistyped: true,},
	{ text: "it\'s an announcement of a table drop of a different kind.", typed: true, delay: 200 ,isMistyped: true,},
    { text: "I\'ve finally decided to take the plunge and migrate my system. ", typed: true, delay: 500 ,isMistyped: true,},
    { text: "This is not a system crash, it\'s more of an upgrade, if you will.", typed: true, delay: 1000 ,isMistyped: true,},
	{ text: '<br>', delay: 0, isHTML: true }, 
    { text: "As your friendly neighborhood DBA, I\'ve spent countless hours ", typed: true, delay: 50 ,isMistyped: true,},
	{ text: "diagnosing why \"it\'s not a database issue\" ",typed: true, delay: 50 },
	{ text: "and showing the magical powers of turning it off and on again. ", typed: true, delay: 500 ,isMistyped: true,},
    { text: "I\'ve encountered many a NULL value, ", typed: true, delay: 55 ,isMistyped: true,},
	{ text: "rebuilt countless indexes,", typed: true, delay: 55 },
	{ text: "imported more schemas than there are grains of sand on Rhyl beach, ", typed: true, delay: 70 ,isMistyped: true,},
	{ text: "and have been the hero, villain,", typed: true, delay: 55 ,isMistyped: true,},
	{ text: "and sometimes the \'unknown stored procedure\' of the day. ", typed: true, delay: 750 ,isMistyped: true,},
    { text: "But now, it is time for me to commit my last transaction here,", typed: true, delay: 50 ,isMistyped: true,},
	{ text: "release all my locks and free up some memory space for new processes.", typed: true, delay: 500 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "This is not a goodbye, but a \'see you later\'.", typed: true, delay: 500 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "Our data may be relational,", typed: true, delay: 50 ,isMistyped: true,},
    { text: "but our friendship doesn't require a JOIN operation.", typed: true, delay: 50 ,isMistyped: true,},
    { text: "I’m keeping open all ports for fun and non-work related chats.", typed: true, delay: 50 ,isMistyped: true,},
    { text: "Ping me anytime and I promise to return more than just a server status.", typed: true, delay: 500 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "Thank you for all the laughter, challenges, and null pointers. ", typed: true, delay: 500 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "Keep those queries quick, indexes tuned, and your downtime low.", typed: true, delay: 50 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "Until we meet at a cross join in life...", typed: true, delay: 50 ,isMistyped: true,},
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "Jake :)", typed: true, delay: 50 },
    { text: '<br>', delay: 0, isHTML: true }, 
    { text: "jake@jakemorgan.co.uk", typed: true, delay: 50 },
	{ text: '<br>', delay: 0, isHTML: true }, 
	{ text: '<br>', delay: 0, isHTML: true }, 
	{ text: "26 rows selected",isHTML: true, delay: 0 },
	
	
	{ text: '<br>', delay: 0, isHTML: true }, 
	{ text: '<br>', delay: 0, isHTML: true }, 
	
	
	{ text: "SELECT DBMS_LOB.SUBSTR(IMAGE, 4000, 1) AS JakePic FROM Jake;", typingDelay: 3000, sqlPrompt: true, typed: true, delay: 500 ,isMistyped: true,},
	
		
    { text: '<br>', delay: 0, isHTML: true },    
    { text: "JAKEPIC", delay: 0, isHTML: true }, 
    { text: "-------------------------------------------------------------------------", delay: 0, isHTML: true }, 

	
	
	
 	{ text: "<pre>                         ./(((///.</pre>", delay: 40, isHTML: true },                                   
 	{ text: "<pre>                 ,/#%&&&&&&&&&&&&&&&&%#/,.</pre>", delay: 40, isHTML: true },                                
 	{ text: "<pre>             ,(%&&&&&&&&&&&&&&&&&&&&&&&&&&%#*</pre>", delay: 40, isHTML: true },                             
 	{ text: "<pre>          .(&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#,</pre>", delay: 40, isHTML: true },                          
 	{ text: "<pre>         /%&&&&&&&&&&&&&&&@@@@@@@@@&&&&&&&&&&&&&#.</pre>", delay: 40, isHTML: true },                        
 	{ text: "<pre>       ,#&&&&&&&&&&&&&@&@@@@@@@@@@@@@@@&&&&&&&&&&%*</pre>", delay: 40, isHTML: true },                       
	{ text: "<pre>       .%&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&%,</pre>", delay: 40, isHTML: true },                      
	{ text: "<pre>       (&&&&&&&&%#((/(((%&@@@@@@@@@@@@@@@@@@&&&&&&&&#</pre>", delay: 40, isHTML: true },                      
	{ text: "<pre>      .%&&&&&%/,,,........*(%&@@@@@@@@@#(/**/(%&&&&&%.</pre>", delay: 40, isHTML: true },                     
	{ text: "<pre>      ,%&&&&(*/(%&&@@@&%(*../&@@@@@@#,,......,,,*#&&&, </pre>", delay: 40, isHTML: true },                    
	{ text: "<pre>     (#&&&&%#&&&&&&&&&&&&&&&&&&&&&&&&#%%&&&&&&%(/*(&&. </pre>", delay: 40, isHTML: true },                    
	{ text: "<pre>      *&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&%. </pre>", delay: 40, isHTML: true },                    
	{ text: "<pre>     ,,/%&&&&&&&&&%%####%&&&&&&&&&&&&&&&&&&&&&&&&&&&&% </pre>", delay: 40, isHTML: true },      
	{ text: "<pre>./&&&&//%&&&&&%#%#/(. *(&%%&&&&&&&&&&&(/*.,*(#%%&&&%(, </pre>", delay: 40, isHTML: true },                    
	{ text: "<pre> ,#%###**%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%((#%&&&&&%/#&&,</pre>", delay: 40, isHTML: true },                   
	{ text: "<pre> *%##(,/%&&@@@@@@@@@@@@@@@&@&&&&&&&&&@&@&@&@&@&&&&%/(#%* </pre>", delay: 40, isHTML: true },                  
	{ text: "<pre>  *###,*%&@@@@@@@@@@@@@@@@@&&&&&@@&&&@@@@@@@@@@@@@%*(##. </pre>", delay: 40, isHTML: true },                  
 	{ text: "<pre>.,%%(,,(&&@@@@@@@@@@@@@&&&&&&&&&@&&&&&@@@@@@@@@@&(*%#.  </pre>", delay: 40, isHTML: true },                  
 	{ text: "<pre> (&&(,**(&&@@@@@@@@@@@@@%#(//#%%%#(/#&@@@@@@@@@&#**## </pre>", delay: 40, isHTML: true },      
 	{ text: "<pre>  *#(,,***(%&&&&&/*///((((((#%%%%%%&&&@@@@@@@@&(**/&% </pre>", delay: 40, isHTML: true },      
 	{ text: "<pre>     ..,*****/(##********/*///*//*/*///**(%@&#*,,,/% </pre>", delay: 40, isHTML: true },      
	{ text: "<pre>      ..,,***********,/%&%%%##((///*******/(/**,,..  </pre>", delay: 40, isHTML: true },                      
 	{ text: "<pre>      ...,,*********%&%&&&@&&&&&&&&&@&*******,,..    </pre>", delay: 40, isHTML: true },                     
	{ text: "<pre>        ....,,******,(%&&&%%%%##((##%%%/****,,...   </pre>", delay: 40, isHTML: true },                       
 	{ text: "<pre>        .....,**********//(########/***,,.....    </pre>", delay: 40, isHTML: true },                       
 	{ text: "<pre>        ...,,....,,,,******************,,,....... </pre>", delay: 40, isHTML: true },                          
	{ text: "<pre>         .,,,,,,,,,,,.....,,,,,,,,**,****,,,,....,,,,,,, </pre>", delay: 40, isHTML: true },                     
	{ text: "<pre>   .,,,,,,,,,,,,,,,,,.........,,,,,,......,,,,,,,,,,,,,,,.   </pre>", delay: 40, isHTML: true },                 
	{ text: "<pre> .,,,,,,,,,,,,,,,,,,,,,............,,,,,,,,,,,,,,,,,,,,,,.. </pre>", delay: 40, isHTML: true },      
	{ text: "<pre>.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,, </pre>", delay: 40, isHTML: true },      
	{ text: "<pre>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, </pre>", delay: 40, isHTML: true },      
	{ text: "<pre>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, </pre>", delay: 40, isHTML: true }      
];



const delay = ms => new Promise(res => setTimeout(res, ms));

const executeSqlSequence = async () => {
    for (let i = 0; i < sqlSequence.length; i++) {
        await typeWriter(sqlSequence[i], 100);
        await delay(sqlSequence[i].delay);
    }
};

const startSequence = async () => {
    for (let i = 0; i < bootSequence.length; i++) {
        if (i === 2) logo.style.display = 'block';
        if (bootSequence[i].isMemTest) {
            // Memory test
            let memoryTestLineIndex = bootDiv.children.length;
            for (let j = 0; j <= 16384; j += 128) {
                let line = document.createElement('div');
                line.textContent = `Memory Test:			 ${j}K OK`;
                if (bootDiv.children[memoryTestLineIndex]) {
                    bootDiv.replaceChild(line, bootDiv.children[memoryTestLineIndex]);
                } else {
                    bootDiv.appendChild(line);
                }
                await sleep(50);
            }
        } else {
            let line = document.createElement('div');
            if (bootSequence[i].isHTML) {
                line.innerHTML = bootSequence[i].text;
            } else {
                line.textContent = bootSequence[i].text;
            }
            if (bootSequence[i].id) line.id = bootSequence[i].id;
            bootDiv.appendChild(line);
        }
        await sleep(bootSequence[i].delay);
    }

    logo.style.display = 'none';
    document.getElementById('msdos').innerHTML = '<strike>Starting MS-DOS...</strike>';
    bootDiv.innerHTML += '<div>Starting Linux...</div>';
    await sleep(5000);

    bootDiv.innerHTML = '';

    for (let i = 0; i < linuxSequence.length; i++) {
        bootDiv.innerHTML += '<div>' + linuxSequence[i].text + '</div>';
        await sleep(linuxSequence[i].delay);
    }

    bootDiv.style.color = 'lime';
    await sleep(2000);

  /*  for (let i = 0; i < sqlSequence.length; i++) {
        await typeWriter(sqlSequence[i], 100);
    }
  */
    await executeSqlSequence();
};

startSequence();
