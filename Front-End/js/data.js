const courses = [
  {
    id: "SOEN287",
    code: "SOEN 287",
    name: "Web Programming",
    instructor: "Jane Doe",
    term: "Winter 2026",
    assessments: [
      { id: "A1", name: "Deliverable 1", due: "2026-02-27", gradePct: 80, weightPct: 20, completed: false },
      { id: "Q1", name: "Quiz 1",        due: "2026-02-20", gradePct:70,  weightPct: 10, completed: true  },
      { id: "Q1", name: "Finale Exam",        due: "2026-02-26", gradePct:60,  weightPct: 70, completed: false  },

    ]
  },
  {
    id: "COMP352",
    code: "COMP 352",
    name: "Data Structures",
    instructor: "John Smith",
    term: "Winter 2026",
    assessments: [
      { id: "L1", name: "Lab 1", due: "2026-02-18", gradePct: 80, weightPct: 20, completed: false }
    ]
  },
];


const currentUser = {
  role: "student/instructor",          
  name: "Othmane Filali",
  email: "othmane@gmail.com",
  password: "Password123"   
};
