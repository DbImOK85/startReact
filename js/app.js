
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        textAll: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 UAH!',
        textAll: 'А евро 42 UAH!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        textAll: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

let Article = React.createClass ({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            textAll: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: true
        }
    },

    handleReadMoreClick: function(e) {
        e.preventDefault();
        this.state.visible = false;
        this.setState(this.state);
    },

    render: function() {
        let author = this.props.data.author;
        let text = this.props.data.text;
        let textAll = this.props.data.textAll;
        let visible = this.state.visible;

        console.log('render',this);
        return (
            <div className="news__article">
                <p className="news__author">{author}</p>
                <p className="news__text">{text}</p>
                <a href="#"
                    className={'news__readmore ' + (visible ? '' : 'none')}
                    onClick={this.handleReadMoreClick}>Подробнее</a>
                <p className={"news__text_all " + (visible ? '' : 'none')}>{textAll}</p>
            </div>
        )
    }
});

let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
   render: function() {
       let news = this.props.data;
       let newsTemplate;
       if (news) {
           newsTemplate = news.map(function(item, i){
               console.log(item);
               return (
                   <div key={i}>
                        <Article data={item}/>
                   </div>
               )

           });
       } else {
           newsTemplate = <p className="news__empty">Новостей нет</p>
       }
       return (
           <div className="news">
           {newsTemplate}
                <strong className={news.indexOf() !== -1 ? '' : 'none'}>Всего новостей: {news.length}</strong>
            </div>
       )
   }
});

let Comments = React.createClass({
    render: function () {
        return (
        <div className="comments">
            Новостей нет, комментировать нечего!
        </div>
        )
    }
})


let App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News data={my_news}/>
                <Comments />
            </div>
        )
    }
})



ReactDOM.render(
    <App />,
    document.getElementById('root')
);
