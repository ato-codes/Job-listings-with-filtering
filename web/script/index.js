const jobs = [
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "./images/photosnap.svg",
    "_new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "./images/manage.svg",
    "_new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "./images/account.svg",
    "_new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "logo": "./images/myhome.svg",
    "_new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "logo": "./images/loop-studios.svg",
    "_new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["Ruby", "Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "logo": "./images/faceit.svg",
    "_new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "languages": ["Ruby"],
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "logo": "./images/shortly.svg",
    "_new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "logo": "./images/insure.svg",
    "_new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue", "Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "logo": "./images/eyecam-co.svg",
    "_new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "logo": "./images/the-air-filter-company.svg",
    "_new": false,
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
]

// {
//     "id": 1,
//     "company": "Photosnap",
//     "logo": "./images/photosnap.svg",
//     "new": true,
//     "featured": true,
//     "position": "Senior Frontend Developer",
//     "role": "Frontend",
//     "level": "Senior",
//     "postedAt": "1d ago",
//     "contract": "Full Time",
//     "location": "USA Only",
//     "languages": ["HTML", "CSS", "JavaScript"],
//     "tools": []
//   }

class Card{
    constructor({id,company,logo,_new,featured,position,role,level,postedAt,contract,location,languages,tools}){
        this.id = id
        this.company = company
        this.logo = logo
        this._new = _new
        this.featured = featured
        this.position = position
        this.role = role
        this.level = level
        this.postedAt = postedAt
        this.contract = contract
        this.location = location
        this.languages = languages
        this.tools = tools
    }

    identifier({text_content,className}){
        const identifer_base = document.createElement('div')
        identifer_base.className = className

        const txt = document.createElement('p')
        txt.textContent = text_content
        
        identifer_base.append(txt)
        return identifer_base
    }

    tags({name}){
        const tag_base = document.createElement('div')
        tag_base.id = 'tag-base'

        const p = document.createElement('p')
        p.textContent = name

        tag_base.append(p)
        return tag_base
    }
    
    get card(){
        const base = document.createElement('div')
        base.id = 'card-base'


        if(this._new || this.featured){
            base.classList.add('new-featured')
        }
        
        const logo = document.createElement('img')
        logo.setAttribute('src',this.logo)

        const card_details = document.createElement('div')
        card_details.id = 'card-details'
        
        const card_headers = document.createElement('div')
        card_headers.id = 'card-headers'

        const company = document.createElement('p')
        company.className = 'company'
        company.textContent = this.company

        if(this._new){
            const n = this.identifier({text_content : 'NEW!',className:'new'})
            card_headers.append(n)    
        }
        if(this.featured){
            const f = this.identifier({text_content : 'FEATURED',className:'featured'})
            card_headers.append(f)
        }

        const position = document.createElement('p')
        position.className = 'position'
        position.textContent = this.position
        
        const info_div = document.createElement('div')
        info_div.id = 'info-div'

        const [postedAt,contract,location] = [document.createElement('p'),document.createElement('p'),document.createElement('p')]
        postedAt.className = 'info position-at'
        postedAt.textContent = this.postedAt
        contract.className = 'info contract'
        contract.textContent = this.contract
        location.className = 'info location'
        location.textContent = this.location

        const br = document.createElement('br')

        const tags_div = document.createElement('div')
        tags_div.id = 'tags-div'
        
        const tags = [this.role,this.level,...this.languages]
        
        for(let tag of tags){
            const _tag = this.tags({name : tag})
            tags_div.append(_tag)
        }

        card_headers.append(company)
        info_div.append(postedAt,contract,location)
        card_details.append(card_headers,position,info_div)
        base.append(logo,card_details,br,tags_div)
        return base
    }
}

const cards_list = document.getElementById('cards-list')
for(let job of jobs){
    const card_base = new Card(job)
    const card = card_base.card

    cards_list.append(card)
}
