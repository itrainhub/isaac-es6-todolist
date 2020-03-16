import Component from "@/base/component"

export default class TodoHeader extends Component {
  defaultProps = {
    title: '待办事项列表',
    subtitle: '今日事今日毕，勿将今事待明日！'
  }

  render() {
    const { title, subtitle } = Object.assign({}, this.defaultProps, this.props)
    return (`
      <section class="hero is-dark">
        <div class="hero-body">
          <h1 class="title">${title}</h1>
          <h2 class="subtitle">${subtitle}</h2>
        </div>
      </section>
    `)
  }
}
