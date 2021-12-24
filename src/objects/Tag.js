class Tag {
    constructor(tagName, tagStudent, tagClub, tagColor){
        this._tagName = tagName;
        this._tagStudent = tagStudent;
        this._tagClub = tagClub;
        this._tagColor = tagColor; 
    }

    getTagName() {
        return this._tagName;
    }

    setTagName(name) {
        this._tagName = name;
    }

    getTagStudent() {
        return this._tagStudent;
    }

    setTagStudent(student) {
        this._tagStudent = student;
    }

    getTagClub() {
        return this._tagClub;
    }

    setTagClub(club) {
        this._tagClub = club;
    }

    getTagColor() {
        return this._tagColor;
    }

    setTagColor(color) {
        this._tagColor = color;
    }
}

module.exports = {Tag}