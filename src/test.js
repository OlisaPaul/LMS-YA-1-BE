const students = [
  {
    _id: "6473303e51094913760bca5a",
    firstName: "Ruthie",
    lastName: "Glover",
    password: "$2b$10$FwwNE6tbi38oFM4oXGvB0uv6Rmn9IN6EO/LnkdcyWySZZhckvXhc2",
    email: "ruthie.glover@example.com",
    userName: "@glovy",
    learningTrack: "backend",
    eth: "0xBBAC6AABCFEBACEBCEABCEACB76767867676ACCC",
    avatarUrl:
      "https://api.dicebear.com/5.x/bottts/svg?seed=ruthie-w38wr-glover-gewv6-example-w38wr-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/bottts/svg?seed=ruthie-w38wr-glover-gewv6-example-w38wr-com&size=200&radius=50 alt=6473303e51094913760bca5a>",
    __v: 0,
    role: "student",
  },
  {
    _id: "647464cf931cfd723f1f9392",
    firstName: "Arnaldo",
    lastName: "Cummings",
    password: "$2b$10$2ZbjfP17G0nilnTBSX6vbuR5fMGRlTAAi.GdMGo2xjDiVfiQJ.GSG",
    email: "arnaldo.cummings@example.com",
    userName: "@CKIKE",
    learningTrack: "product design",
    eth: "0xeA0B9657892321121287128712BC78A89F989AAA",
    avatarUrl:
      "https://api.dicebear.com/5.x/bottts/svg?seed=arnaldo-3cqhc-cummings-9lskm-example-3cqhc-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/bottts/svg?seed=arnaldo-3cqhc-cummings-9lskm-example-3cqhc-com&size=200&radius=50 alt=647464cf931cfd723f1f9392>",
    __v: 0,
    role: "student",
  },
  {
    _id: "6475f9cf18dc71090e6b989c",
    firstName: "Nyah",
    lastName: "Herman",
    password: "$2b$10$XC7EQEiRkhVIAAIfvQ14we46nuCRjFvr9z3HGCJWw2yEXji7OgjqK",
    email: "nyah.herman@example.com",
    userName: "@nyahherman",
    learningTrack: "frontend",
    role: "student",
    eth: "12345",
    avatarUrl:
      "https://api.dicebear.com/5.x/adventurer/svg?seed=nyah-vqnne-herman-m7tob-example-vqnne-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/adventurer/svg?seed=nyah-vqnne-herman-m7tob-example-vqnne-com&size=200&radius=50 alt=6475f9cf18dc71090e6b989c>",
    __v: 0,
  },
  {
    _id: "64762ea71510b509f0199ec2",
    firstName: "Hellen",
    lastName: "VonRueden",
    password: "$2b$10$buQSMhM.YQV.yX/uneldxOcYa1pSyF65Upk3nW7KUCxLP/xMMcnPS",
    email: "hellen.vonrueden@example.com",
    userName: "@hellenvonrueden",
    learningTrack: "frontend",
    role: "student",
    eth: "12345",
    avatarUrl:
      "https://api.dicebear.com/5.x/micah/svg?seed=hellen-gomh9-vonrueden-g1a64-example-gomh9-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/micah/svg?seed=hellen-gomh9-vonrueden-g1a64-example-gomh9-com&size=200&radius=50 alt=64762ea71510b509f0199ec2>",
    __v: 0,
  },
  {
    _id: "64762ea91510b509f0199ec6",
    firstName: "Yasmine",
    lastName: "Koch",
    password: "$2b$10$FHxPulQRem82wXOuGhltQ.YmpgnxknbneUPOq1ZjfpiFQlUaR6O.2",
    email: "yasmine.koch@example.com",
    userName: "@yasminekoch",
    learningTrack: "frontend",
    role: "student",
    eth: "12345",
    avatarUrl:
      "https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=yasmine-ic3xw-koch-5fkon-example-ic3xw-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=yasmine-ic3xw-koch-5fkon-example-ic3xw-com&size=200&radius=50 alt=64762ea91510b509f0199ec6>",
    __v: 0,
  },
  {
    _id: "64762eab1510b509f0199eca",
    firstName: "Elvie",
    lastName: "Witting",
    password: "$2b$10$2JipSTVXels0yoI2AtmjbeqIEDCIrm9diwnNYVevIZ4h2.Gj7m4Xe",
    email: "elvie.witting@example.com",
    userName: "@elviewitting",
    learningTrack: "frontend",
    role: "student",
    eth: "12345",
    avatarUrl:
      "https://api.dicebear.com/5.x/croodles-neutral/svg?seed=elvie-xpkjt-witting-gmv5d-example-xpkjt-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/croodles-neutral/svg?seed=elvie-xpkjt-witting-gmv5d-example-xpkjt-com&size=200&radius=50 alt=64762eab1510b509f0199eca>",
    __v: 0,
  },
  {
    _id: "64762ead1510b509f0199ece",
    firstName: "Antone",
    lastName: "Beahan",
    password: "$2b$10$74qUvd0zknbTJgqcqLG5qukBGiPHN3QkPM2b823ScivXGN97.Pzsa",
    email: "antone.beahan@example.com",
    userName: "@antonebeahan",
    learningTrack: "frontend",
    role: "student",
    eth: "12345",
    avatarUrl:
      "https://api.dicebear.com/5.x/big-smile/svg?seed=antone-t2dwf-beahan-54uuj-example-t2dwf-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/big-smile/svg?seed=antone-t2dwf-beahan-54uuj-example-t2dwf-com&size=200&radius=50 alt=64762ead1510b509f0199ece>",
    __v: 0,
  },
  {
    _id: "648626096975d04e9cd226dc",
    firstName: "Kade",
    lastName: "Towne",
    password: "$2b$10$i6Hr4jO5A7KPf9Axo8nXg.G2xD.UfqCjaBHpOoAn5hmEaqedQHmx6",
    email: "kade.towne@example.com",
    userName: "@kade",
    learningTrack: "frontend",
    role: "student",
    eth: "0xeA0B9657892321121287128712BC78A89F989AAA",
    avatarUrl:
      "https://api.dicebear.com/5.x/big-ears/svg?seed=kade-3do0v-towne-trgbr-example-3do0v-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/big-ears/svg?seed=kade-3do0v-towne-trgbr-example-3do0v-com&size=200&radius=50 alt=648626096975d04e9cd226dc>",
    __v: 0,
  },
  {
    _id: "648629d06975d04e9cd226ec",
    firstName: "Dwight",
    lastName: "Auer",
    password: "$2b$10$96q7r3421lPtKQ9iL6rQWupzYlJPlEYlCsSxRHP/g6tRIOJ8.Xyiu",
    email: "dwight.auer@example.com",
    userName: "@dwighty",
    learningTrack: "frontend",
    role: "student",
    eth: "0xBBAC6AABCFEBACEBCEABCEACB76767867676ACCC",
    avatarUrl:
      "https://api.dicebear.com/5.x/identicon/svg?seed=dwight-8qmeh-auer-70bz4-example-8qmeh-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/identicon/svg?seed=dwight-8qmeh-auer-70bz4-example-8qmeh-com&size=200&radius=50 alt=648629d06975d04e9cd226ec>",
    __v: 0,
  },
  {
    _id: "6487065cc4f16c0f3f042295",
    firstName: "Johan",
    lastName: "Smith",
    password: "$2b$10$/H959h1JnrT3F8qRbCHM5ufzlA2QuMNCZ.a7JlrPgjmQ4smFYj9Ei",
    email: "johan.smith@example.com",
    userName: "@paulolisa",
    learningTrack: "frontend",
    role: "student",
    eth: "0xBBAC6AABCFEBACEBCEABCEACB76767867676ACCC",
    avatarUrl:
      "https://api.dicebear.com/5.x/initials/svg?seed=johan-y3oen-smith-gvikq-example-y3oen-com&size=200&radius=50",
    avatarImgTag:
      "<img src=https://api.dicebear.com/5.x/initials/svg?seed=johan-y3oen-smith-gvikq-example-y3oen-com&size=200&radius=50 alt=6487065cc4f16c0f3f042295>",
    __v: 0,
  },
];

const scores = [
  {
    totalScore: 250,
    student: [
      {
        _id: "64762ead1510b509f0199ece",
        firstName: "Antone",
        lastName: "Beahan",
        learningTrack: "frontend",
      },
    ],
    tasks: ["Task B", "Task A", "Task C"],
    grade: 62.5,
  },
  {
    totalScore: 90,
    student: [
      {
        _id: "6475f9cf18dc71090e6b989c",
        firstName: "Nyah",
        lastName: "Herman",
        learningTrack: "frontend",
      },
    ],
    tasks: ["This is a test task"],
    grade: 22.5,
  },
  {
    totalScore: 294,
    student: [
      {
        _id: "64762eab1510b509f0199eca",
        firstName: "Elvie",
        lastName: "Witting",
        learningTrack: "frontend",
      },
    ],
    tasks: ["Task B", "Task A", "Task C"],
    grade: 73.5,
  },
  {
    totalScore: 93,
    student: [
      {
        _id: "647464cf931cfd723f1f9392",
        firstName: "Arnaldo",
        lastName: "Cummings",
        learningTrack: "product design",
      },
    ],
    tasks: ["Read about me"],
    grade: 46.5,
  },
  {
    totalScore: 255,
    student: [
      {
        _id: "64762ea91510b509f0199ec6",
        firstName: "Yasmine",
        lastName: "Koch",
        learningTrack: "frontend",
      },
    ],
    tasks: ["Task B", "Task C", "Task A"],
    grade: 63.75,
  },
  {
    totalScore: 94,
    student: [
      {
        _id: "6473303e51094913760bca5a",
        firstName: "Ruthie",
        lastName: "Glover",
        learningTrack: "backend",
      },
    ],
    tasks: ["Read about me"],
    grade: 15.666666666666666,
  },
];

const scoredStudentIds = scores.map((score) => score.student[0]._id);

const studentsWithoutScores = students.filter(
  (student) => !scoredStudentIds.includes(student._id)
);

console.log(studentsWithoutScores);
