
class Card{
  constructor({_id,company,logo,_new,featured,position,role,level,postedAt,contract,location,languages,tools}){
      this._id = _id
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

  generate_tags({_id='tag-base',_className='card-tag',textContent}){
      
      const tag_base = document.createElement('div')
      tag_base.id = _id
      tag_base.className = `${_className} ${textContent}`

      const p = document.createElement('p')
      p.textContent = textContent

      tag_base.append(p)
      return tag_base
  }

  new_featured_tab({_new}){
      const tab_base = document.createElement('div')
      const p = document.createElement('p')

      if(_new){
          tab_base.className = 'new'
          p.textContent = 'NEW!'
      }else{
          tab_base.className = 'featured'
          p.textContent = 'FEATURED'
      }
      tab_base.append(p)
      return tab_base

  }

  generate_divs({ids,_class,type}){
      const generated = []
      for(let i = 0; i < ids.length; i++){
          const element = document.createElement(type)
          typeof ids === 'object'
          ?element.id = ids[i]
          :element.id = ids

          generated.push(element)
      }
      return generated
  }

  get card(){
      const card_base = document.createElement('div')
      card_base.id = 'card-base'

      if(this.featured || this._new)card_base.className = 'featured-new'

      const wrapper = document.createElement('div')
      wrapper.id = 'card-wrapper'

      const [description,line,tags] = this.generate_divs({
          ids:['card-description','card-line','card-tags'],
          type:'div'
      })
      
      const [card_info,position_info,time_info] = this.generate_divs({
          ids : ['card-info','position-info','time-info'],
          type : 'div'
      })

      const [company,position] = [document.createElement('p'),document.createElement('p')]
      company.id = 'company'
      company.textContent = this.company

      position.id = 'position'
      position.textContent = this.position

      const [postedAt,contract,location] = this.generate_divs({ids:'info',type:'p'})
      postedAt.textContent = `${this.postedAt}\t.`
      contract.textContent = `${this.contract}\t.`
      location.textContent = this.location

      const _tags = [this.role,this.level,...this.tools,...this.languages]

      for(let _tag of _tags){
          const tag_div = this.generate_tags({
              textContent:_tag
          })
          tags.append(tag_div)
      }

      const _logo = document.createElement('img')
      _logo.setAttribute('src',this.logo)
      _logo.id = 'card-logo'

      time_info.append(postedAt,contract,location)
      position_info.append(position)
      card_info.append(company)
      if(this._new){
          let _new = this.new_featured_tab({_new:true})
          card_info.append(_new)
      }
      if(this.featured){
          let featured = this.new_featured_tab({_new:false})    
          card_info.append(featured)
      }
      description.append(card_info,position_info,time_info)
      wrapper.append(_logo,description,line,tags)
      card_base.append(wrapper)
      return card_base
  }
}

class Tags extends Card{

  tag_search({tags=[]}){
    const tags_base = document.createElement('div')
    tags_base.id = 'tags-search'

    const clear = document.createElement('button')
    clear.id = 'clear'
    clear.textContent = 'Clear'

    const tags_container = document.createElement('div')
    tags_container.id = 'tags-container'

    if(tags.length > 0){
      for(let tag of tags){
        const tag_div = super.generate_tags({_id:'searching-tag',textContent : tag})
        const remove = document.createElement('button')
        remove.id = 'tag-remove-btn'
        remove.textContent = 'X'

        tag_div.append(remove)
        tags_container.append(tag_div)
      }
    }

    tags_base.append(tags_container,clear)
    return tags_base
  }

}
const {tag_search} = new Tags({})
const cards_list = document.getElementById('cards-list')
const head = document.getElementById('head')
let tags_s = []

const get_data = ({path,filter}) =>{
  // * CHANGE THE API URL TO YOUR PC IP ADDRESS 
  // * AND ALSO ON YOUR WEB BROWSER TYPE THE IP ADDRESS AND THE PORT AS 1000
  // * BUT CAN BE CHANGED AT SERVER CODE ✌✌

  const api_url = 'http://127.0.0.1:1000/'
  if(!path)return "Path Not Specified"
  console.log(api_url)
  fetch(api_url + path)
  .then(data => data.json())
  .then(data => {
    const founded = []
    if(filter && filter.length > 0){
      const searching_div = tag_search({tags:filter})
      head.innerHTML = ''
      head.append(searching_div)
      
      const clear = document.getElementById('clear')
      const tag_rmv_btns = document.querySelectorAll('#tag-remove-btn')

      for(let tag_rmv_btn of tag_rmv_btns){
        tag_rmv_btn.onclick = () =>{
    
          const tag_name = tag_rmv_btn.parentElement.classList[1]
          
          filter = filter.filter(tag => {
            if(tag != tag_name){
              return tag
            }
          })
          
          if(filter.length === 0)searching_div.remove()          

          tags_s = filter
          get_data({path:path,filter:filter})
        }
      }
      for(let d of data){
        const tags = [d.role,...d.tools,...d.languages]
        for(let f of filter){
          if(tags.includes(f)){
            founded.push(d)
          }
        }
      }
      
      data = founded
      clear.onclick = () => {
        tags_s = []
        searching_div.remove()
        get_data({path:path,filter:tags_s})
      }
    }
    return make_cards(data)
  })
  .catch(err => {
    if(err){
      console.log(err)
      console.log('Trying Again After 3 seconds')
      setTimeout(()=>{
        get_data(path)
      },3000)
    }
  })
}

const make_cards = (datas) =>{
  cards_list.innerHTML = ''
  for(let data of datas){
    const card_base = new Card(data)
    const card = card_base.card
    cards_list.append(card)
  }
  
  const tags = document.querySelectorAll('#tag-base')
  for(let tag of tags){
    const _tags = tag.classList[1]
    tag.onclick = () => {
      tags_s.push(_tags)
      cards_list.innerHTML = ''
      return get_data({path:'jobs',filter:tags_s})
    }
  }
  return
}
get_data({path:'jobs'})


const add_job = document.getElementById('ico')
const checkboxes = document.querySelectorAll('.check-box')
const contract = document.getElementById('contract')
const form_add_job = document.getElementById('form-add-job')
checkboxes.forEach((checkbox,index)=>{
  let _index = 1
  let part_time
  checkbox.onchange = () =>{
    if(index === 0){
      _index = 1
      part_time = 'Part Time'
    }else{
      _index = 0
      part_time = 'Full Time'
    }
    if(!checkbox.getAttribute('checked')){
      checkboxes[_index].checked = false
      checkbox.checked = true

    }
    contract.value = part_time
    console.log(contract)
  }
})
add_job.onclick = () => form_add_job.classList.toggle('view-flex')
// add_job.onclick = () =>