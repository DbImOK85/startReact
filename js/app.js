let my_news = [

];



let News = React.createClass({
   render: function () {
       let news = this.props.data;
       let newsTemplate;
       if (news.indexOf() !== -1) {
           newsTemplate = news.map(function(item, i){
               return (
                   <div key={i}>
                   <p className="news__author">{item.author}</p>
               <p className="news__text">{item.text}</p>
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
                I am a component of Ract! I can view the news
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
