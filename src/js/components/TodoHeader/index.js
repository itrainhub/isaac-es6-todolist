export default class TodoHeader {
  defaultOptions = {
    title: '待办事项列表',
    subtitle: '今日事今日毕，勿将今事待明日！'
  }
  
  constructor(options) {
    options = Object.assign({}, this.defaultOptions, options)
    const { title, subtitle } = options
    this.title = title
    this.subtitle = subtitle
  }

  render() {
    return (`
      <section class="hero is-dark">
        <div class="hero-body">
          <h1 class="title">${this.title}</h1>
          <h2 class="subtitle">${this.subtitle}</h2>
        </div>
      </section>
    `)
  }
}
