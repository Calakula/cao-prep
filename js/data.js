/* =========================================================
   Вся база вопросов + теория.
   M  = один правильный ответ
   MS = несколько правильных ответов
   MATCH = сопоставление, ORDER = правильный порядок
   ========================================================= */
const M = (q, o, a, x = {}) => ({ t: "mcq", q, o, a: [a], ...x });
const MS = (q, o, a, x = {}) => ({ t: "multi", q, o, a, ...x });
const MATCH = (q, pairs, pool, x = {}) => ({ t: "match", q, pairs, pool, ...x });
const ORDER = (q, seq, x = {}) => ({ t: "order", q, seq, ...x });
const IMG = (txt) => ({ img: txt });

const DATA = {
  quizzes: [
    /* ---------------------------------------------------- QUIZ 1 */
    {
      id: "quiz1", short: "Quiz 1", title: "Quiz 1 — Железо и кабели", emoji: "🔌",
      theory: [
        { h: "Сборка UTP-кабеля", items: [
          "<b>UTP</b> = <b>Unshielded Twisted Pair</b> (витая пара без экрана).",
          "Инструмент, которым обжимают коннектор (RJ-45) на кабеле — <b>crimper</b> (кримпер).",
          "Порядок работы: <b>1)</b> отрезать кабель нужной длины → <b>2)</b> снять оболочку → <b>3)</b> разложить пары по схеме → <b>4)</b> вставить в коннектор → <b>5)</b> обжать → <b>6)</b> проверить тестером. Самый первый шаг — <b>Cut the cable to length</b>.",
          "Схема <b>T568B</b> (слева направо): <code>бело-оранжевый, оранжевый, бело-зелёный, синий, бело-синий, зелёный, бело-коричневый, коричневый</code>.",
          "Мнемоника для T568B: пары 1-2 — оранж., 3-6 — зелёная (разнесена), 4-5 — синяя, 7-8 — коричневая."
        ]},
        { h: "Материнская плата и чипсет", items: [
          "<b>Chipset</b> (чипсет) управляет связью между CPU, оперативной памятью и другими компонентами на материнской плате.",
          "<b>BIOS/CMOS</b> — прошивка и память настроек, не управляют обменом данными между компонентами."
        ]},
        { h: "Накопители данных", items: [
          "Магнитный носитель: <b>HDD (hard disk drive)</b> и <b>tape drive</b> (ленточный накопитель).",
          "SSD — флеш-память (без движущихся частей). CD/DVD/Blu-ray — оптические диски (лазер).",
          "Скорость HDD измеряется в <b>RPM</b> (revolutions per minute, обороты в минуту): 5400 / 7200 / 10000.",
          "Во время работы CPU загружает данные для обработки из <b>RAM</b> (оперативная память). ROM — постоянная, HDD/SSD — долговременная."
        ]}
      ],
      questions: [
        M("What tool is used to attach connector to the cable?", ["Chopper", "Butter", "Crimper", "Cutter"], "Crimper"),
        M("Which component controls the communications and interactions between the CPU and other components on the motherboard?", ["CMOS", "BIOS", "RAM", "chipset"], "chipset"),
        MS("Which two storage devices use a magnetic medium for storing data? (Choose two.)", ["solid state drive", "tape drive", "hard disk drive", "compact disk drive", "blue-ray disk drive"], ["tape drive", "hard disk drive"]),
        M("What is UTP stands for?", ["Universal Twisted Pair", "Undefeated Training Portal", "Unified Testing Pair", "Unshielded Twisted Pair"], "Unshielded Twisted Pair"),
        M("What is the very first step when you build the UTP network cable?", ["Crimp the cable", "Remove the shielding", "Test the cable", "Cut the cable to length"], "Cut the cable to length"),
        ORDER("What is correct wiring scheme for T568B?", ["White-Orange", "Orange", "White-Green", "Blue", "White-Blue", "Green", "White-Brown", "Brown"]),
        M("Which unit of measurement is used to indicate the hard drive speed?", ["clusters per minute", "revolutions per minute", "pages per minute", "gigabytes"], "revolutions per minute"),
        M("From which type of data storage does the CPU load information for processing during normal operation?", ["hard drive", "ROM", "SSD", "RAM"], "RAM")
      ]
    },
    /* ---------------------------------------------------- QUIZ 2 */
    {
      id: "quiz2", short: "Quiz 2", title: "Quiz 2 — Принтеры", emoji: "🖨️",
      theory: [
        { h: "Лазерный принтер: 6 шагов печати", items: [
          "<b>Charging</b> (зарядка барабана) → <b>Exposing</b> (лазер рисует скрытое изображение) → <b>Developing</b> (нанесение тонера на скрытое изображение на барабане) → <b>Transferring</b> (перенос на бумагу) → <b>Fusing</b> (закрепление <b>теплом</b> и давлением) → <b>Cleaning</b>.",
          "На картинке <b>Laser Unit</b> — блок лазера (не картридж, не тонер, не блок питания)."
        ]},
        { h: "Типичные проблемы и решения", items: [
          "Цветной лазерный принтер очень медленно печатает фото высокого разрешения → <b>добавить RAM в принтер</b>.",
          "Общий (shared) принтер не появляется в списке → <b>вручную добавить по IP-адресу</b>.",
          "Пустые страницы / блёклая печать у лазерного → <b>заменить картридж с тонером</b>.",
          "Струйный принтер ничего не печатает → <b>закончились чернила</b> (ink cartridge empty).",
          "Скорость струйного принтера зависит от <b>желаемого качества изображения</b>."
        ]},
        { h: "Безопасность общего принтера", items: [
          "Главный риск при совместном использовании принтера — <b>data privacy</b> (конфиденциальность данных): чужие документы могут оказаться в очереди/памяти принтера.",
          "Shoulder surfing — подглядывание через плечо, dumpster diving — копание в мусоре, replay attack — повтор перехваченных пакетов."
        ]},
        { h: "Настройки печати", items: [
          "<b>Paper orientation</b> — книжная/альбомная (portrait/landscape).",
          "<b>Print layout</b> — normal, banner, booklet, poster.",
          "<b>Collate</b> — печать наборов многостраничного документа по порядку.",
          "<b>Duplex</b> — двусторонняя печать.",
          "<b>Grayscale printing</b> — только чёрные чернила, оттенки серого."
        ]}
      ],
      questions: [
        M("A reporter is trying to print several high resolution photographs but the color laser printer is going extremely slowly. What should the technician do to resolve the issue?", ["Update the BIOS.", "Install a USB hub.", "Connect the printer using wireless.", "Add more RAM to the printer.", "Rewind the ribbon."], "Add more RAM to the printer."),
        M("What is the name of this object? [Image-based question]", ["Power Supply Unit", "Laser Unit", "Toner", "Cartridge"], "Laser Unit", IMG("вопрос с картинкой — блок лазера")),
        M("A small company is moving towards sharing printers to reduce the number of printers used within the company. The technician has security concerns. What security risk is associated with sharing a printer?", ["data privacy", "shoulder surfing", "replay attacks", "dumpster diving"], "data privacy"),
        M("A school is installing a new shared printer but the printer is not showing up on the list of available printers. What should the technician do to resolve the issue?", ["Reset the page counter.", "Check the vibration of the crystals.", "Clean the printer.", "Rewind the ribbon.", "Manually add the printer IP address."], "Manually add the printer IP address."),
        M("In laser printing, what is the name of the process of applying toner to the latent image on the drum?", ["charging", "developing", "transferring", "fusing"], "developing"),
        M("Which factor affects the speed of an inkjet printer?", ["the desired quality of the image", "the cost of the inkjet cartridges", "the size of printer power supply", "the quality of the paper"], "the desired quality of the image"),
        M("What would cause an inkjet printer to fail to print any pages?", ["The printer is loaded with a paper type other than photo paper.", "The printer software is set to toner save.", "The ink cartridge is empty.", "The printer ribbon is worn out."], "The ink cartridge is empty."),
        MATCH("Match the common printer configuration options to the correct descriptions. (Not all options are used.)",
          [["landscape or portrait", "paper orientation"], ["normal, banner, booklet, or poster", "print layout"], ["print sets of document with multiple pages", "collate"], ["two-sided printing", "duplex"], ["images printed using only black ink in different shades", "grayscale printing"]],
          ["collate", "grayscale printing", "duplex", "paper orientation", "nujabes", "print layout"])
      ]
    },
    /* ---------------------------------------------------- QUIZ 3 */
    {
      id: "quiz3", short: "Quiz 3", title: "Quiz 3 — Сборка ПК", emoji: "🖥️",
      theory: [
        { h: "Корпус и комплектующие", items: [
          "<b>Drive bay</b> — отсек в корпусе, где размещаются накопители.",
          "От <b>материнской платы</b> больше всего зависит выбор корпуса и блока питания (форм-фактор, разъёмы).",
          "<b>Standoffs</b> (стойки) не дают материнской плате касаться металла корпуса (замыкание).",
          "Блок питания в корпусе-башне обычно крепится <b>винтами (screws)</b>.",
          "Тип памяти: <b>DIMM</b> — десктопы, <b>SODIMM</b> — ноутбуки."
        ]},
        { h: "Слоты расширения", items: [
          "<b>PCIe</b> имеет варианты <b>x1, x4, x8, x16</b> разной длины. PCI/AGP — старые стандарты, SATA — для накопителей.",
          "Мощной видеокарте нужны дополнительные кабели питания — например, <b>два 8-pin PCIe power</b> коннектора. 24-pin ATX — это питание материнской платы."
        ]},
        { h: "Разъёмы передней панели (front panel header)", items: [
          "Pins <b>5/7</b> — <b>RESET SW</b>, pins <b>6/8</b> — <b>POWER SW</b> (по этой схеме квиза). Запомни: 5-7 reset, 6-8 power.",
          "HDD LED и POWER LED — индикаторы (светодиоды)."
        ]},
        { h: "Видеокабели", items: [
          "<b>VGA</b> — аналоговый, синий 15-pin разъём. DVI — белый, HDMI — цифровой с аудио, Thunderbolt — быстрый универсальный."
        ]}
      ],
      questions: [
        M("What is a name of the place in the case where all the drives are located?", ["DriveUnit", "DrivePark", "Drive slots", "Drivebay"], "Drivebay"),
        M("When a new PC is being built, which component has the most influence when selecting the case and power supply?", ["sound card", "motherboard", "video card", "RAM module", "hard disk type"], "motherboard"),
        M("How does this cable called? [Image-based question]", ["IDK", "DVI", "HDMI", "VGA", "Thunderbolt"], "VGA", IMG("вопрос с картинкой — синий 15-pin аналоговый кабель")),
        M("What connectors are attached to pins 6/8?", ["POWER SW", "RESET SW", "HDD LED", "POWER LED"], "POWER SW"),
        M("How is a power supply commonly attached to a tower case?", ["screws", "standoffs", "retention bar", "restraining strap"], "screws"),
        M("Which type of memory module is usually installed in laptops?", ["DIMM", "SODIMM", "SSRDIMM", "NARUTO", "ESIMM"], "SODIMM"),
        M("What connectors are attached to pins 5/7?", ["HDD LED", "RESET SW", "POWER LED", "POWER SW"], "RESET SW"),
        M("Which type of motherboard expansion slot has four types ranging from x1 to x16 with each type having a different length of expansion slot?", ["PCI", "SATA", "AGP", "PCIe"], "PCIe"),
        M("A technician is installing a new high-end video adapter card into an expansion slot on a motherboard. What may be needed to operate this video adapter card?", ["PCI expansion slot", "Two 8-pin power connectors", "PCIe x 8 expansion slot", "24-pin ATX power connector"], "Two 8-pin power connectors"),
        M("What is used to prevent the motherboard from touching metal portions of the computer case?", ["ZIF sockets", "thermal compound", "an I/O shield", "standoffs"], "standoffs")
      ]
    },
    /* ---------------------------------------------------- QUIZ 4 */
    {
      id: "quiz4", short: "Quiz 4", title: "Quiz 4 — Сети", emoji: "🌐",
      theory: [
        { h: "Базовые понятия", items: [
          "<b>Server</b> — устройство или ПО, предоставляющее функции другим программам/устройствам (клиентам).",
          "<b>Switch</b> — сетевое устройство, соединяющее устройства в сети и пересылающее данные с помощью коммутации пакетов.",
          "<b>IP (Internet Protocol)</b> — набор правил форматирования данных и адресации.",
          "<b>DNS</b> переводит доменные имена в IP-адреса. Если IP пингуется, а имя — нет → <b>неисправен DNS-сервер</b>.",
          "Gigabit Ethernet требует <b>активный (питаемый) TAP</b> для перехвата трафика."
        ]},
        { h: "Wi-Fi каналы", items: [
          "Каналы <b>1, 6, 11</b> в 2.4 ГГц не пересекаются. Меняют канал, чтобы <b>избежать помех</b> от соседних беспроводных устройств."
        ]},
        { h: "IPv6", items: [
          "IPv6 — <b>128 бит</b> (IPv4 — 32 бита). Записывается 8 группами по 16 бит в hex.",
          "Правила сжатия: <b>1)</b> убрать ведущие нули в группе (0db8 → db8, 0000 → 0, 0aa0 → aa0). <b>2)</b> Самую длинную цепочку нулевых групп заменить на <code>::</code> (только <b>один раз</b>).",
          "Пример: <code>2001:0db8:cafe:0000:0835:0000:0000:0aa0</code> → <code>2001:db8:cafe:0:835::aa0</code>. Нельзя два раза использовать <code>::</code>."
        ]}
      ],
      questions: [
        M("Which type of network requires an active, powered TAP (test access point) to capture network traffic?", ["load balanced", "wireless", "gigabit Ethernet", "10 Megabit Ethernet"], "gigabit Ethernet"),
        M("Which network server is malfunctioning if a user can ping the IP address of a web server but cannot ping the web server host name?", ["the DHCP server", "the DNS server", "the FTP server", "the HTTP server"], "the DNS server"),
        M("How many bits are used to represent an IPv6 address?", ["32", "48", "128", "12"], "128"),
        M("What is server?", ["A device or software that provides functionality for other programs or devices (clients)", "A protocol used exclusively for assigning IP addresses dynamically", "A physical tool used to strip network cable jackets", "A type of coaxial cable used for long-distance data transmission"], "A device or software that provides functionality for other programs or devices (clients)"),
        M("What is switch?", ["A protocol that translates domain names into IP addresses", "A wireless router channel selector", "A cable tester tool used to check UTP pinouts", "A networking hardware device that connects devices on a network and forwards data using packet switching"], "A networking hardware device that connects devices on a network and forwards data using packet switching"),
        M("A technician is configuring the channel on a wireless router to either 1, 6, or 11. What is the purpose of adjusting the channel?", ["to avoid interference from nearby wireless devices", "to enable different 802.11 standards", "to provide stronger security modes", "to disable broadcasting of the SSID"], "to avoid interference from nearby wireless devices"),
        M("Which IPv6 address represents the most compressed form of the IPv6 address 2001:0db8:cafe:0000:0835:0000:0000:0aa0/80?", ["2001:0db8:cafe:0000:0835::0aa0/80", "2001:db8:cafe:0000:0835::aa0/80", "2001:db8:cafe:0:835::aa0/80", "2001:0db8:cafe:0000:0835::0aa/80", "2001:db8:cafe::0835::aa0/80"], "2001:db8:cafe:0:835::aa0/80"),
        M("What is IP?", ["Instant Ping, a command used to check network latency instantly", "Internal Program, a system software used to boot up the BIOS", "Internet Protocol, a set of rules governing data formatting and addressing", "Integrated Port, a hardware slot for connecting fiber optics"], "Internet Protocol, a set of rules governing data formatting and addressing")
      ]
    },
    /* ---------------------------------------------------- MIDTERM */
    {
      id: "midterm", short: "Midterm", title: "Midterm Quiz", emoji: "📝",
      theory: [
        { h: "Что входит в Midterm", items: [
          "Midterm объединяет темы <b>Quiz 1–4</b>: принтеры, сборка ПК, сети. Открой теорию этих квизов ниже по ссылкам:",
          "<a href='quiz1.html'>Quiz 1 — железо и кабели</a> · <a href='quiz2.html'>Quiz 2 — принтеры</a> · <a href='quiz3.html'>Quiz 3 — сборка ПК</a> · <a href='quiz4.html'>Quiz 4 — сети</a>"
        ]},
        { h: "Новые темы в Midterm", items: [
          "<b>Z-Wave</b> — открытый стандарт умного дома, до <b>232 устройств</b>. (Zigbee — до сотен/тысяч, но другой стандарт; 802.11n/ac — это Wi-Fi.)",
          "<b>Firewall</b> — стоит между двумя и более сетями и защищает данные и оборудование от несанкционированного доступа.",
          "<b>Access point</b> — основная функция: беспроводное подключение пользователей. Router — маршрутизация, modem — связь с провайдером, switch — коммутация.",
          "<b>Cloud-based network controller</b> — удалённое управление многими устройствами из одной панели.",
          "<b>MAC address filtering</b> — разрешает/блокирует устройства по физическому (MAC) адресу.",
          "<b>DHCP</b> автоматически выдаёт IP-адреса. APIPA — автоадрес 169.254.x.x, когда DHCP недоступен.",
          "Принтер напрямую в сеть — <b>Ethernet</b>. Прямое подключение по USB: <b>сначала установить драйвер</b>, потом подключать принтер.",
          "Для башни (tower) нужна память <b>DIMM</b>, не SODIMM (это ноутбуки).",
          "Лазерный принтер закрепляет тонер <b>теплом</b> (fuser). Блёклые/пустые страницы → <b>заменить тонер-картридж</b>."
        ]},
        { h: "Маска подсети", items: [
          "Маска 255.255.0.0 = /16. Количество бит сетевой части = количеству единиц в маске = <b>16</b>.",
          "Маска 255.255.255.0 = /24, 255.0.0.0 = /8."
        ]}
      ],
      questions: [
        M("Which smart home wireless technology has an open standard that allows up to 232 devices to be connected?", ["Zigbee", "Z-Wave", "802.11n", "802.11ac"], "Z-Wave"),
        M("A user is complaining that the printer is printing pages with no image on them. What should the technician do to resolve the issue?", ["Update the OS", "Reset the page counter", "Check the vibration of the Crystal’s", "Clean the printer", "Replace the toner cartridge"], "Replace the toner cartridge"),
        M("A school is installing a new shared printer but the printer is not showing up on the list of available printers. What should the technician do to resolve the issue?", ["Rewind the ribbon.", "Manually add the printer IP address.", "Clean the printer.", "Reset the page counter.", "Check the vibration of the crystals."], "Manually add the printer IP address."),
        M("A student is looking to add memory in order to speed up a tower computer. Which type of memory module should the student be looking for?", ["SODIMM", "SIMM", "DIP", "DIMM"], "DIMM"),
        M("When a new PC is being built, which component has the most influence when selecting the case and power supply?", ["motherboard", "RAM module", "hard disk type", "video card", "sound card"], "motherboard"),
        M("What type of connection would be used to connect a printer directly to the network?", ["serial", "Ethernet", "Firewire", "USB"], "Ethernet"),
        M("Which factor affects the speed of an inkjet printer?", ["the size of printer power supply", "the cost of the inkjet cartridges", "the quality of the paper", "the desired quality of the image"], "the desired quality of the image"),
        M("What would cause an inkjet printer to fail to print any pages?", ["The printer software is set to toner save.", "The printer is loaded with a paper type other than photo paper.", "The ink cartridge is empty.", "The printer ribbon is worn out."], "The ink cartridge is empty."),
        M("A technician is configuring the channel on a wireless router to either 1, 6, or 11. What is the purpose of adjusting the channel?", ["to provide stronger security modes", "to avoid interference from nearby wireless devices", "to enable different 802.11 standards", "to disable broadcasting of the SSID"], "to avoid interference from nearby wireless devices"),
        M("A technician is installing a printer that will be directly connected to a computer. Why does the technician not connect the printer initially during the installation process?", ["The OS of the workstation needs to be updated first.", "The printer needs to be configured first.", "The printer driver might need to be installed first before the printer is connected.", "The Microsoft download site needs to be searched first for the printer driver."], "The printer driver might need to be installed first before the printer is connected."),
        M("A reporter is trying to print several high resolution photographs but the color laser printer is going extremely slowly. What should the technician do to resolve the issue?", ["Connect the printer using wireless.", "Update the BIOS.", "Rewind the ribbon.", "Add more RAM to the printer.", "Install a USB hub."], "Add more RAM to the printer."),
        M("What is DNS?", ["Domain Expansion: Infinite Void", "Digital Networking Service", "Domain Name System", "Driver Net Service"], "Domain Name System"),
        M("What corrective action should be taken if a printer is printing faded images?", ["secure loose printer cables", "clean the printer", "update the print driver", "replace the toner cartridge"], "replace the toner cartridge"),
        M("Which network server is malfunctioning if a user can ping the IP address of a web server but cannot ping the web server host name?", ["the DHCP server", "the FTP server", "the HTTP server", "the DNS server"], "the DNS server"),
        M("Which type of network requires an active, powered TAP (test access point) to capture network traffic?", ["10 Megabit Ethernet", "load balanced", "gigabit Ethernet", "wireless"], "gigabit Ethernet"),
        M("A technician is searching through a storage locker and finds a firewall. What is the purpose of this device?", ["It connects a home or business network to a company that provides internet connectivity as well as television signals.", "It is a device that can be inserted in the middle of a cable run to add power.", "It is placed between two or more networks and protects data and equipment from unauthorized access.", "It is a device that uses existing electrical wiring to connect devices and sends data using specific frequencies."], "It is placed between two or more networks and protects data and equipment from unauthorized access."),
        M("What mechanism is used in a laser printer to permanently fuse the toner to the paper?", ["heat", "light", "electrical charge", "pressure"], "heat"),
        M("How many bits are used to represent an IPv6 address?", ["32", "128", "48", "12"], "128"),
        M("How many bits are used to represent the network address of a host with an IP address of 192.168.150.16 and a subnet mask of 255.255.0.0?", ["128", "32", "16", "42"], "16"),
        M("What is switch?", ["A cable tester tool used to check UTP pinouts", "A wireless router channel selector", "A networking hardware device that connects devices on a network and forwards data using packet switching", "A protocol that translates domain names into IP addresses"], "A networking hardware device that connects devices on a network and forwards data using packet switching"),
        M("Which network protocol is used to automatically assign an IP address to a computer on a network?", ["FTP", "DHCP", "SMTP", "APIPA", "ICMP"], "DHCP"),
        M("What is that? [Image-based question]", ["Cartridge", "Drum", "Laser Unit", "Power Supply Unit"], "Laser Unit", IMG("вопрос с картинкой — блок лазера")),
        M("Which device provides wireless connectivity to users as its primary function?", ["router", "modem", "switch", "access point"], "access point"),
        M("Which network device allows administrators to remotely manage many devices through one dashboard interface?", ["powerline networking", "cloud-based network controller", "switch that supports VLANs", "Power over Ethernet"], "cloud-based network controller"),
        M("Which filtering method uses the physical address to specify exactly which device is allowed or blocked from sending data on a network?", ["port triggering", "whitelisting", "MAC address filtering", "port forwarding"], "MAC address filtering")
      ]
    },
    /* ---------------------------------------------------- QUIZ 5 */
    {
      id: "quiz5", short: "Quiz 5", title: "Quiz 5 — Видеонаблюдение", emoji: "📹",
      theory: [
        { h: "Agent DVR и детекция движения", items: [
          "<b>Motion detection</b> в Agent DVR — программная: сравнивает <b>разницу пикселей между соседними кадрами</b> видео (не ИК-датчик, не звук, не Wi-Fi).",
          "<b>Detection sensitivity</b> — фильтрует мелкий фоновый пиксельный шум, но реагирует на реальное движение.",
          "<b>Masking zones</b> — исключают области с повторяющимся фоновым движением (деревья, вентилятор, экран), чтобы они не вызывали ложных тревог.",
          "При срабатывании: рамка камеры <b>становится красной</b>, а график уровня движения (motion level) <b>подскакивает</b>."
        ]},
        { h: "Сеть в лабораторной", items: [
          "Компьютер и смартфон должны быть <b>в одной локальной сети (тот же SSID/подсеть)</b>.",
          "К IP добавляют <b>порт</b> (:8081, :8080), чтобы указать, <b>какая программа/служба</b> на устройстве принимает трафик.",
          "Адрес вида <code>/video</code> отдаёт <b>сырой непрерывный видеопоток</b> вместо веб-интерфейса управления.",
          "Слишком высокое разрешение (4K) на нескольких камерах по Wi-Fi → <b>большая нагрузка на канал: потеря пакетов, задержки, высокая загрузка CPU</b>."
        ]},
        { h: "Связь с Endterm", items: [
          "Статический IP для камеры нужен, потому что после окончания DHCP-аренды IP может измениться и поток сломается.",
          "<b>AP/Client Isolation</b> на роутере может запретить ПК доступ к камере смартфона, даже при одной сети Wi-Fi."
        ]}
      ],
      questions: [
        M("Why is the detection sensitivity setting important in video surveillance systems?", ["It changes the volume level of the microphone", "It filters out minor background pixel noise while still reacting to real movement", "It adjusts the physical focus of the camera lens", "It increases the Wi-Fi transmission power of the server"], "It filters out minor background pixel noise while still reacting to real movement"),
        M("What is the main consequence of setting a very high resolution (such as 4K) on multiple streaming cameras simultaneously over a local Wi-Fi network?", ["The camera battery immediately drains to zero and powers off", "The router automatically disconnects all wired devices", "The video automatically converts to grayscale format", "High bandwidth consumption leading to packet loss, latency, and high CPU usage"], "High bandwidth consumption leading to packet loss, latency, and high CPU usage"),
        M("How does the Agent DVR interface visually indicate that motion detection has been triggered?", ["The browser automatically closes", "A text message (SMS) is sent to the student's phone", "The video resolution drops to 144p", "The camera tile border turns red and a motion level graph spikes"], "The camera tile border turns red and a motion level graph spikes"),
        M("What is the primary requirement for the computer and the smartphone to communicate in this laboratory setup?", ["The computer must use a static public IP address", "Both devices must have Bluetooth turned on and paired", "Both devices must be connected to the public Internet with mobile data", "Both devices must be connected to the exact same local network (SSID/subnet)"], "Both devices must be connected to the exact same local network (SSID/subnet)"),
        M("How does the software-based motion detector in Agent DVR detect movement?", ["By utilizing hardware infrared PIR sensors on the smartphone", "By analyzing changes in acoustic waves through the microphone", "By comparing pixel differences between consecutive video frames", "By measuring fluctuations in the Wi-Fi signal strength"], "By comparing pixel differences between consecutive video frames"),
        M("When using mobile streaming applications, what is the main purpose of accessing an endpoint like /video instead of just the root IP address?", ["To turn on the phone's flash LED", "To download recorded archive files", "To reboot the mobile device remotely", "To access the raw continuous video feed instead of the web control interface"], "To access the raw continuous video feed instead of the web control interface"),
        M("What is the main purpose of configuring Masking Zones in a motion detector?", ["To exclude specific areas with repetitive background movement from triggering alarms", "To change the color palette of the live video stream", "To blur out faces for personal privacy compliance", "To turn off video recording during nighttime hours"], "To exclude specific areas with repetitive background movement from triggering alarms"),
        M("Why is it necessary to append a port number (such as :8081 or :8080) to the IP address when connecting to the camera stream?", ["It specifies which software service/process on the device handles the incoming network traffic", "It represents the physical camera lens number on the smartphone", "It acts as an encryption key for the video signal", "It speeds up the Wi-Fi connection"], "It specifies which software service/process on the device handles the incoming network traffic")
      ]
    },
    /* ---------------------------------------------------- QUIZ 6 */
    {
      id: "quiz6", short: "Quiz 6", title: "Quiz 6 — Виртуализация и облака", emoji: "☁️",
      theory: [
        { h: "Виртуализация", items: [
          "<b>Hypervisor</b> — ПО, которое создаёт и управляет несколькими виртуальными машинами (VM) на одном хосте.",
          "<b>Type 1 (bare metal)</b> — работает прямо на железе; используется в <b>дата-центрах</b> (VMware ESXi, Hyper-V, Xen).",
          "<b>Type 2 (hosted)</b> — работает поверх обычной ОС (VirtualBox, VMware Workstation, Parallels). Если на ноутбуке с macOS ставят виртуальную Windows → <b>Type 2</b>.",
          "Приложение не поддерживается в Windows → создать <b>виртуальную машину</b> с ОС, которая его поддерживает.",
          "Виртуализация помогает в disaster recovery через <b>live migration</b> (перенос работающих VM между серверами)."
        ]},
        { h: "Облачные вычисления", items: [
          "<b>Cloud computing</b> — доступ к данным и сервисам из любого места в любое время через интернет.",
          "<b>Public cloud</b> — для всех. <b>Private cloud</b> — для одной организации (например, правительство). <b>Community cloud</b> — под специфические общие нужды нескольких организаций. <b>Hybrid cloud</b> — два или более облака, объединённые единой архитектурой.",
          "Разница: <b>cloud computing отделяет приложение от железа</b>, а <b>виртуализация отделяет ОС от физического железа</b>."
        ]}
      ],
      questions: [
        M("How does virtualization help with disaster recovery within a data center?", ["guarantee of power", "improvement of business practices", "support of live migration", "supply of consistent air flow"], "support of live migration"),
        MATCH("Match the definition to the type of cloud.",
          [["built to meet a specific need", "community cloud"], ["intended for a specific organization or entity, such as the government", "private cloud"], ["made up of two or more clouds connected via a single architecture", "hybrid cloud"], ["services made available to the general population", "public cloud"]],
          ["community cloud", "semi-public cloud", "public cloud", "hybrid cloud", "private cloud"]),
        M("What technology allows users to access data anywhere and at any time?", ["virtualization", "micromarketing", "Cloud computing", "data analytics"], "Cloud computing"),
        M("Which cloud model provides services for a specific organization or entity?", ["a community cloud", "a private cloud", "a public cloud", "a hybrid cloud"], "a private cloud"),
        M("A technician needs to use an application that is not supported by Windows operating systems on the PC. How can the technician make this application run on the PC?", ["Install the application with elevated permissions as administrator.", "Create a virtual machine with an operating system that supports the application.", "Use the Windows Compatibility mode.", "Install the application in safe mode."], "Create a virtual machine with an operating system that supports the application."),
        M("Which type of hypervisor would most likely be used in a data center?", ["Hadoop", "Type 2", "Type 1", "Nexus"], "Type 1"),
        M("What is a difference between the functions of Cloud computing and virtualization?", ["Cloud computing separates the application from the hardware whereas virtualization separates the OS from the underlying hardware.", "Cloud computing utilizes data center technology whereas virtualization is not used in data centers.", "Cloud computing requires hypervisor technology whereas virtualization is a fault tolerance technology.", "Cloud computing provides services on web-based access whereas virtualization provides services on data access through virtualized Internet connections."], "Cloud computing separates the application from the hardware whereas virtualization separates the OS from the underlying hardware.")
      ]
    },
    /* ---------------------------------------------------- QUIZ 7 */
    {
      id: "quiz7", short: "Quiz 7", title: "Quiz 7 — IIS, FTP, порты", emoji: "🗄️",
      theory: [
        { h: "Веб-сервер IIS", items: [
          "Включается в Windows: <b>Turn Windows features on or off → Internet Information Services (IIS)</b>.",
          "Стартовая страница сайта по умолчанию — <b>index.html</b>.",
          "Корневая папка сайта по умолчанию: <code>C:\\inetpub\\wwwroot\\</code>.",
          "Открыть входящий TCP 80 в Windows Firewall (PowerShell): <code>New-NetFirewallRule -DisplayName \"HTTP\" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow</code>.",
          "<code>http://localhost</code> указывает на <b>локальную машину</b> — с другого компьютера он откроет <i>его собственный</i> localhost, поэтому нужен реальный IP сервера."
        ]},
        { h: "FTP / FileZilla", items: [
          "FTP: порт <b>21</b> — управление (control/command), порт <b>20</b> — передача данных. HTTP — <b>80</b>, HTTPS — <b>443</b>, SSH — <b>22</b>, RDP — <b>3389</b>.",
          "Пользователь в FileZilla Server: включить <b>Require password to log in</b>.",
          "Чтобы загружать и удалять файлы: права <b>Read, Write, Create, Delete</b>.",
          "Ошибка <b>530 Login incorrect</b> → проверить логин/пароль и что аккаунт создан и применён (Apply) на сервере."
        ]},
        { h: "Сетевые команды Windows", items: [
          "<code>ipconfig /all</code> — полная информация об адаптерах: IP, маска, шлюз, DNS, MAC.",
          "<code>ipconfig /release</code> — освободить DHCP-аренду. <code>ipconfig /renew</code> — получить заново. <code>ipconfig /flushdns</code> — очистить DNS-кэш.",
          "<b>Subnet mask</b> определяет, какая часть IP — <b>сеть (network ID)</b>, а какая — <b>хост (host ID)</b>."
        ]}
      ],
      questions: [
        M("Which PowerShell command opens inbound traffic on TCP port 80 for the IIS web server?", ["Set-FirewallRule -Port 80 -Action Open", "Allow-NetFirewallRule -Port 80 -Protocol TCP", "New-NetFirewallRule -DisplayName \"HTTP\" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow", "Open-Port -Port 80 -Protocol HTTP"], "New-NetFirewallRule -DisplayName \"HTTP\" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow"),
        M("Which default TCP port is used by FTP for control and command transmission?", ["Port 20", "Port 80", "Port 3389", "Port 21"], "Port 21"),
        M("What command should be executed in the Windows Command Prompt to view full network adapter details, including IP address, subnet mask, and default gateway?", ["netstat /all", "tracert /all", "ipconfig /all", "ping /all"], "ipconfig /all"),
        M("What role does the Subnet Mask play in IP configuration?", ["It automatically assigns static IP addresses to wireless devices", "It encrypts all network traffic passing through the router", "It converts domain names into numeric IP addresses", "It determines which portion of an IP address represents the network ID and which represents the host ID"], "It determines which portion of an IP address represents the network ID and which represents the host ID"),
        M("What file name is conventionally used as the default landing page for a web server?", ["default.db", "index.html", "main.exe", "config.txt"], "index.html"),
        M("When configuring a user account in FileZilla Server, which credential option is typically required for secure authentication?", ["Authenticate via hardware token only", "Require password to log in", "Allow anonymous login only", "Disable all authentication checks"], "Require password to log in"),
        M("What action should a user take if FileZilla Client reports the error code \"530 Login incorrect\"?", ["Switch the network cable to another port on the switch", "Change the computer's MAC address", "Verify the username, password, and ensure the account is properly created and applied on the server", "Reinstall the Windows operating system"], "Verify the username, password, and ensure the account is properly created and applied on the server"),
        M("What command is used in the Windows command line to release the current DHCP IP address lease?", ["ipconfig /flushdns", "ipconfig /release", "ipconfig /registerdns", "ipconfig /renew"], "ipconfig /release"),
        M("Which of the following components must be enabled in Windows \"Turn Windows features on or off\" to deploy a local web server?", ["FTP Publishing Service", "Internet Information Services (IIS)", "Telnet Client", "Simple Network Management Protocol"], "Internet Information Services (IIS)"),
        M("Which of the following permissions must typically be granted to an FTP user in FileZilla Server to allow them to upload and delete files?", ["Administrator root privileges only", "Read, Write, Create, and Delete", "Read and Execute only", "Print management permissions"], "Read, Write, Create, and Delete")
      ]
    },
    /* ---------------------------------------------------- QUIZ 8 */
    {
      id: "quiz8", short: "Quiz 8", title: "Quiz 8 — Команды Windows/Linux", emoji: "💻",
      theory: [
        { h: "Команды Windows (cmd)", items: [
          "<code>tasklist</code> — список процессов (локально или удалённо).",
          "<code>taskkill /f /im имя.exe</code> — принудительно (/f) завершить процесс по имени образа (/im).",
          "<code>tracert</code> — трассировка маршрута: список «остановок» (хопов) между ПК и сервером.",
          "<code>shutdown</code> — выключение/перезагрузка, в том числе удалённых компьютеров.",
          "<code>copy</code> — копировать файл (оригинал остаётся). <code>move</code> — переместить (оригинал исчезает).",
          "<code>cd</code> — сменить каталог. <code>netstat</code> — активные TCP-подключения. <code>diskpart</code> — управление дисками. <code>bootrec</code> — восстановление загрузки.",
          "<code>sfc</code> — проверка системных файлов. <code>DISM</code> — обслуживание образа Windows."
        ]},
        { h: "Linux", items: [
          "Бэкап файлов в новую папку на другом диске: <code>mkdir</code> (создать папку) + <code>cp</code> (скопировать). <code>mv</code> переносит (не бэкап), <code>rm</code> удаляет.",
          "Проверить результат: <code>ls</code>."
        ]},
        { h: "Загрузка и восстановление", items: [
          "Ошибка <b>Invalid Boot Disk</b> после POST → вероятная причина: <b>повреждена MBR</b>.",
          "Не устанавливается и не удаляется приложение в Windows 10 без потери данных → <b>Restore Point</b> (точка восстановления).",
          "Файловая система Apple (современные Mac) — <b>APFS</b> (HFS+ — старая)."
        ]}
      ],
      questions: [
        M("A user needs to display a list of current processes running on a local or a remote computer. What is the best Windows command to select to do the job?", ["path", "format", "bootrec", "tasklist", "diskpart"], "tasklist"),
        M("A technician is troubleshooting a Windows 10 PC with a frozen Internet Explorer window. Which command can the technician run, as an administrator at a command prompt, to terminate the Internet Explorer process that has hung?", ["taskkill /fi iexplorer.exe", "taskkill /f /im iexplorer.exe", "taskkill /pid iexplorer.exe", "taskkill /f /im explorer.exe"], "taskkill /f /im iexplorer.exe"),
        MS("A Linux administrator wants to backup current files in a data directory and store them in a new directory on another disk. Which two commands would be needed? (Choose two.)", ["mkdir", "rm", "cd", "mv", "cp"], ["mkdir", "cp"]),
        M("A technician is troubleshooting a PC. The display shows an \"Invalid Boot Disk\" error after the POST. What is a probable cause?", ["The PC does not have a floppy drive or the floppy drive is broken.", "A process is using most of the CPU resources.", "The date and time have been changed in the BIOS and do not reflect the correct time and date.", "The PC has a BIOS password.", "The MBR is corrupted."], "The MBR is corrupted."),
        M("A user tries to install an application on a Windows 10 Pro PC but it fails. The user tries to uninstall the application but it fails to uninstall. What option can be used to address this issue without loss of data or applications?", ["Uninstall and reinstall the device using device manager.", "Restart the Windows Update services.", "Use Advanced Start-up.", "Use Restore Point."], "Use Restore Point."),
        M("A user is troubleshooting a connectivity issue from the PC to a web server and wants to see a list of the traffic stops between the PC and the web server. What is the best Windows command to select to do the job?", ["bootrec", "diskpart", "tasklist", "tracert", "recover"], "tracert"),
        M("A user has to shutdown several remote computers one at a time. What is the best Windows command to select to do the job?", ["recover", "nslookup", "ping", "shutdown", "netstat"], "shutdown"),
        M("A user has an important file that is used in many projects and needs to move that file to a different Windows directory while maintaining it in the current location. What is the best Windows command to select to do the job?", ["history", "diskpart", "bootrec", "copy", "ipconfig"], "copy"),
        M("Which file system is the primary file system used by Apple in current Macintosh computers?", ["HFS+", "CDFS", "ext3", "APFS", "ext2"], "APFS"),
        M("A user is reorganizing files within different directories to accommodate new projects and needs to relocate a file from one Windows directory to another one. What is the best Windows command to select to do the job?", ["history", "move", "DISM", "sfc", "tasklist"], "move")
      ]
    },
    /* ---------------------------------------------------- ENDTERM 1 */
    {
      id: "endterm1", short: "Endterm V1", title: "Endterm — Variant 01", emoji: "🎓",
      theory: [],   // заполняется ниже (общая теория Endterm)
      questions: [
        M("How many bits are used to represent an IPv6 address?", ["128", "48", "12", "32", "64"], "128"),
        M("Which network server is malfunctioning if a user can ping the IP address of a web server but cannot ping the web server host name?", ["The FTP server", "The HTTP server", "The DNS server", "The DHCP server", "The HTTPS server"], "The DNS server"),
        M("Which type of network requires an active, powered TAP (test access point) to capture network traffic?", ["wireless", "gigabit Ethernet", "load balanced", "10 Megabit Ethernet", "no correct answer"], "gigabit Ethernet"),
        M("What is the main function of a hypervisor?", ["It is a device that synchronizes a group of sensors.", "It is software used to coordinate and prepare data for analysis.", "It is used to create and manage multiple VM instances on a host machine.", "It is used by ISPs to monitor cloud computing resources.", "It is a device that filters and checks security credentials."], "It is used to create and manage multiple VM instances on a host machine."),
        M("Which type of hypervisor would most likely be used in a data center?", ["Nexus", "Hadoop", "Type 2", "Type 1", "VirtualBox"], "Type 1"),
        M("Which type of Hypervisor is implemented when a user with a laptop running the Mac OS installs a Windows virtual OS instance?", ["type 2", "type 1", "virtual machine", "bare metal", "hybrid"], "type 2"),
        M("What is the default root directory path for a standard local website hosted on Windows IIS?", ["C:\\inetpub\\wwwroot\\", "C:\\www\\html\\", "C:\\Windows\\Web\\", "C:\\Apache\\htdocs\\", "C:\\AppData\\IIS\\root\\"], "C:\\inetpub\\wwwroot\\"),
        M("What command is used to open a text editor in a Linux system?", ["ifconfig", "ls", "grep", "vim", "echo"], "vim"),
        M("Which default TCP port is primarily used for HTTP web traffic?", ["Port 21", "Port 22", "Port 80", "Port 443", "Port 8443"], "Port 80"),
        M("Which condition is required when planning to install Windows on a GPT disk?", ["The computer must be UEFI-based.", "Only one primary partition can contain an OS.", "The maximum partition size cannot exceed 2 TB.", "The maximum number of primary partitions that can co-exist is 4.", "The computer must be APFS-based."], "The computer must be UEFI-based."),
        M("A user suspects someone has hacked into the PC and wants to verify activity on the PC by displaying all active TCP connections to the PC. What is the best Windows command to select to do the job?", ["diskpart", "bootrec", "netstat", "pacman", "regsrv32"], "netstat"),
        M("A user is looking for a file but can not find it in the Document folder. The user wants to move to the Download directory to check there. What is the best Windows command to select to do the job?", ["bootrec", "ipconfig", "diskpart", "cd", "help"], "cd"),
        M("What term is used to describe a logical drive that can be formatted to store data?", ["volume", "cluster", "partition", "track", "sector"], "volume"),
        M("A file called new_resume has the following file permissions: rw-r-x--x. Which octal (numeric) representation corresponds to these permissions?", ["644", "650", "651", "700", "667"], "651"),
        M("Which network protocol is used to automatically assign an IP address to a computer on a network?", ["APIPA", "ICMP", "FTP", "DHCP", "SMTP"], "DHCP"),
        MS("A Linux administrator wants to backup current files in a data directory and store them in a new directory on another disk and check if it's done correctly. Which three commands would be needed? Choose 3 answers.", ["root", "mkdir", "mv", "rm", "cp", "sudo", "ls", "rm -rf /*"], ["mkdir", "cp", "ls"]),
        M("Which file system is the primary file system used by Apple in current Macintosh computers?", ["ext2", "ext3", "APFS", "CDFS", "HFS+"], "APFS"),
        MS("Which three components are used to assign file and directory permissions in Linux systems? Choose 3 answers.", ["root", "group", "owner", "all users", "super group", "admin group", "all groups", "sudo"], ["group", "owner", "all users"]),
        M("Why is accessing a partner's website using `http://localhost` from a separate computer unsuccessful?", ["Because it refers to the local machine", "Because port 80 is reserved exclusively for system updates", "Because IIS blocks local requests entirely", "Because DHCP servers overwrite the loopback address", "Because there is an AP isolation in the network"], "Because it refers to the local machine"),
        M("Which type of security threat can be transferred through email and is used to gain sensitive information by recording the keystrokes of the email recipient?", ["adware", "Trojan", "worm", "virus", "grayware"], "virus", { note: "⚠️ В исходном файле ключа нет — это мой ответ по аналогии с типовым вопросом Cisco IT Essentials. Уточни у преподавателя / одногруппников." })
      ]
    },
    /* ---------------------------------------------------- ENDTERM 2 */
    {
      id: "endterm2", short: "Endterm V2", title: "Endterm — Variant 02", emoji: "🎓",
      theory: [],
      questions: [
        M("How many bits are used to represent an IPv4 address?", ["128", "48", "12", "32", "64"], "32"),
        M("Which network server is malfunctioning if a user can ping the IP address of a web server but cannot ping the web server host name?", ["The FTP server", "The HTTP server", "The DNS server", "The DHCP server", "The HTTPS server"], "The DNS server"),
        M("A user is troubleshooting a connectivity issue from the PC to a web server and wants to see a list of the traffic stops between the PC and the web server. What is the best Windows command to select to do the job?", ["bootrec", "recover", "diskpart", "tracert", "tasklist"], "tracert"),
        M("Which IPv6 address represents the most compressed form of 2001:0db8:cafe:0000:0835:0000:0000:0aa0/80?", ["2001:db8:cafe:0000:0835::aa0/80", "2001:0db8:cafe:0000:0835::0aa/80", "2001:db8:cafe:0:835::aa0/80", "2001:db8:cafe::0835::aa0/80", "2001:0db8:cafe:0000:0835::0aa0/80"], "2001:db8:cafe:0:835::aa0/80"),
        M("Which type of hypervisor would most likely be used in a data center?", ["Nexus", "Hadoop", "Type 2", "Type 1", "VirtualBox"], "Type 1"),
        M("Which type of Hypervisor is implemented when a user with a laptop running the Mac OS installs a Windows virtual OS instance?", ["type 2", "type 1", "virtual machine", "bare metal", "hybrid"], "type 2"),
        M("Why is a fixed or static IP address preferred over a dynamic DHCP lease for an IP camera?", ["Static addresses automatically stabilize optical focus parameters", "DHCP expiration can change the IP and break the stream connection", "Dynamic addressing prevents transmission of multichannel digital audio", "Fixed addressing significantly reduces camera thermal power consumption", "DHCP addressing is way more expensive than Static addressing"], "DHCP expiration can change the IP and break the stream connection"),
        M("Which method is commonly used to remove the default restrictions added to mobile operating systems?", ["rooting", "rootkit execution", "device update", "resetting", "system backup"], "rooting"),
        M("Which default TCP port is primarily used for HTTP web traffic?", ["Port 21", "Port 22", "Port 80", "Port 443", "Port 8443"], "Port 80"),
        M("Which default TCP port is used by FTP for control and command transmission?", ["Port 20", "Port 21", "Port 80", "Port 3389", "Port 43"], "Port 21"),
        M("What network feature on Wi-Fi routers can prevent a computer from accessing a smartphone camera stream even if both are connected to the same Wi-Fi?", ["DHCP Relay", "AP / Client Isolation", "MAC Address Filtering", "DNS Caching", "DNS Splitting"], "AP / Client Isolation"),
        M("A user is looking for a file but can not find it in the Document folder. The user wants to move to the Download directory to check there. What is the best Windows command to select to do the job?", ["bootrec", "ipconfig", "diskpart", "cd", "help"], "cd"),
        M("What term is used to describe a logical drive that can be formatted to store data?", ["volume", "cluster", "partition", "track", "sector"], "volume"),
        M("A file called new_resume has the following file permissions: rw-r--r--. Which octal (numeric) representation corresponds to these permissions?", ["644", "650", "651", "700", "667"], "644"),
        M("Which network protocol is used to automatically assign an IP address to a computer on a network?", ["APIPA", "ICMP", "FTP", "DHCP", "SMTP"], "DHCP"),
        MS("A Linux administrator wants to backup current files in a data directory and store them in a new directory on another disk and check if it's done correctly. Which three commands would be needed? Choose 3 answers.", ["root", "mkdir", "mv", "rm", "cp", "sudo", "ls", "rm -rf /*"], ["mkdir", "cp", "ls"]),
        M("Which file system is the primary file system used by Apple in current Macintosh computers?", ["ext2", "ext3", "APFS", "CDFS", "HFS+"], "APFS"),
        MS("Which three components are used to assign file and directory permissions in Linux systems? Choose 3 answers.", ["root", "group", "owner", "all users", "super group", "admin group", "all groups", "sudo"], ["group", "owner", "all users"]),
        M("Why is accessing a partner's website using `http://localhost` from a separate computer unsuccessful?", ["Because it refers to the local machine", "Because port 80 is reserved exclusively for system updates", "Because IIS blocks local requests entirely", "Because DHCP servers overwrite the loopback address", "Because there is an AP isolation in the network"], "Because it refers to the local machine"),
        M("The IT department is reporting that a company web server is receiving an abnormally high number of web page requests from different locations simultaneously. Which type of security attack is occurring?", ["spyware", "Social Engineering", "adware", "DDos", "phishing"], "DDos")
      ]
    }
  ]
};

/* ---------- Общая теория для обоих Endterm ---------- */
const ENDTERM_THEORY = [
  { h: "Как устроен Endterm", items: [
    "20 вопросов по 5 баллов, 30 минут. В вопросах «Choose 3 answers» балл дают, только если выбраны <b>все</b> правильные и нет лишних.",
    "Большая часть вопросов повторяет Quiz 4, 6, 7, 8 и Midterm — смотри соответствующие страницы."
  ]},
  { h: "IP-адреса и протоколы", items: [
    "<b>IPv4 = 32 бита</b>, <b>IPv6 = 128 бит</b>. MAC = 48 бит.",
    "<b>DHCP</b> автоматически выдаёт IP. Если у камеры динамический IP — после окончания аренды (lease) он может поменяться и <b>поток оборвётся</b>, поэтому для камеры нужен <b>статический IP</b>.",
    "<b>DNS</b>: пингуется IP, но не имя → сломан DNS.",
    "Порты: FTP control <b>21</b>, FTP data 20, SSH 22, HTTP <b>80</b>, HTTPS 443, RDP 3389."
  ]},
  { h: "Wi-Fi: AP / Client Isolation", items: [
    "Функция роутера, которая запрещает клиентам одной Wi-Fi сети общаться друг с другом. Из-за неё ПК не откроет поток камеры смартфона, даже если оба подключены к одной сети. MAC filtering блокирует по адресам, но это другое."
  ]},
  { h: "Виртуализация", items: [
    "<b>Hypervisor</b> создаёт и управляет несколькими VM на одном хосте.",
    "<b>Type 1 (bare metal)</b> — дата-центры. <b>Type 2 (hosted)</b> — поверх ОС, как VirtualBox на Mac/Windows."
  ]},
  { h: "Windows и IIS", items: [
    "Корень сайта на IIS: <code>C:\\inetpub\\wwwroot\\</code>.",
    "<code>tracert</code> — путь пакетов, <code>netstat</code> — активные TCP-подключения, <code>cd</code> — смена каталога.",
    "<b>Volume</b> — логический диск, который можно форматировать. <b>GPT</b> требует <b>UEFI</b> (MBR — BIOS, до 2 ТБ, 4 основных раздела).",
    "<code>http://localhost</code> с другого компьютера не работает — localhost = «эта же машина», нужно использовать IP сервера."
  ]},
  { h: "Linux", items: [
    "Редактор в терминале: <code>vim</code> (также nano). <code>mkdir</code> — создать папку, <code>cp</code> — копировать, <code>ls</code> — просмотреть (проверить), <code>mv</code> — переместить, <code>rm</code> — удалить (<b>rm -rf /*</b> — уничтожает систему!).",
    "<b>Права доступа</b> назначаются для трёх категорий: <b>owner</b> (владелец), <b>group</b> (группа), <b>all users</b> (остальные).",
    "Права в числах: <b>r = 4, w = 2, x = 1</b>. Складываем для каждой тройки.",
    "<code>rw-r--r--</code> = 6 · 4 · 4 = <b>644</b>.",
    "<code>rw-r-x--x</code> = 6 · 5 · 1 = <b>651</b>.",
    "<code>rwxr-xr-x</code> = 755, <code>rwx------</code> = 700, <code>rw-r-----</code> = 640."
  ]},
  { h: "Мобильные ОС и безопасность", items: [
    "<b>Rooting</b> (Android) / jailbreak (iOS) — снятие ограничений мобильной ОС.",
    "<b>DDoS</b> — множество запросов к серверу одновременно из разных мест, чтобы вывести его из строя.",
    "<b>Spyware</b> / keylogger — записывает нажатия клавиш и крадёт данные. <b>Phishing</b> — поддельные письма/сайты. <b>Adware</b> — реклама. <b>Social engineering</b> — обман людей.",
    "<b>APFS</b> — современная файловая система Apple."
  ]}
];
DATA.quizzes.find(q => q.id === "endterm1").theory = ENDTERM_THEORY;
DATA.quizzes.find(q => q.id === "endterm2").theory = ENDTERM_THEORY;

/* Список страниц для навигации */
DATA.groups = [
  { name: "Квизы", ids: ["quiz1", "quiz2", "quiz3", "quiz4"] },
  { name: "Midterm", ids: ["midterm"] },
  { name: "Квизы 5–8", ids: ["quiz5", "quiz6", "quiz7", "quiz8"] },
  { name: "Endterm", ids: ["endterm1", "endterm2"] }
];

if (typeof module !== "undefined") module.exports = DATA;
