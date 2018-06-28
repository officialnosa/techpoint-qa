var inputs = require('../src/inputs/input')

function processStudentsData(students = []) {
  return students
    .map(student => {
      student.age =
        new Date().getFullYear() - new Date(student.dob).getFullYear()

      return student
    })
    .sort((a, b) => a.age - b.age)
}

function studentCanJoinGroup(student, studentGroup = { members: [] }) {
  if (studentGroup.members.length >= 3) return false

  return !studentGroup.members.find(
    student2 => Math.abs(student.age - student2.age) > 5
  )
}

function groupStudents(students) {
  const groups = {
    noOfGroups: 0
  }

  const addStudentToNewGroup = (student, key) => {
    groups[key] = {
      members: [{ name: student.name, age: student.age }],
      oldest: student.age,
      sum: student.age,
      regNos: [student.regNo | 0]
    }
  }

  processStudentsData(inputs).forEach((student, index) => {
    if (index === 00) groups.noOfGroups++
    const key = `group${groups.noOfGroups}`

    if (studentCanJoinGroup(student, groups[key])) {
      if (!groups[key]) addStudentToNewGroup(student, key)
      else {
        groups[key].members.push({
          name: student.name,
          age: student.age
        })
        groups[key].oldest = Math.max(groups[key].oldest, student.age)
        groups[key].sum += student.age

        const newRegNo = student.regNo | 0

        groups[key].regNos = [newRegNo]
          .concat(groups[key].regNos)
          .sort((a, b) => a > b)
      }
    } else {
      const newKey = `group${++groups.noOfGroups}`

      addStudentToNewGroup(student, newKey)
    }
  })

  console.log(groups)
}

groupStudents(inputs)
