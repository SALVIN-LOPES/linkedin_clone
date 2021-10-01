import styled from 'styled-components';
import Leftside from './Leftside.js';
import Main from './Main.js';
import Rightside from './Rightside.js';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const Home = (props) => {
    // console.log('HOME = ', props);
    return (
        <Container>
            {!props.user && <Redirect to='/'/>}
            <Section>
                <h5><a>Hiring in a Hurry? -</a></h5>
                <p> Find talented pros in recored time with up-work and keep bussiness moving.</p>
            </Section>
            <Layout>
                <Leftside />
                <Main />
                <Rightside />
            </Layout>
        </Container>
    )
}

const Container = styled.div`
    padding-top:52px;
    max-width:100%;


`;
const Content = styled.div`
    max-width:1128px;
    margin-left:auto;
    margin-right:auto;
`;
const Section = styled.section`
    min-height:50px;
    padding:16px 0;
    box-sizing:content-box;
    text-align:center;
    text-decoration:underline;
    display:flex;
    justify-content:center;
    h5
    {
        color:#0a66c2;
        font-size:14px;
        a
        {
            font-weight:700;
        }
    }
    p
    {
        font-size:14px;
        color:#434649;
        font-weight:600;
    }

    @media(max-width:768px)
    {
        flex-direction:column;
        padding:0 5px;
        
    }
`;

const Layout = styled.div`
    display:grid;
    grid-template-areas:'leftside main rightside';
    grid-template-columns : minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
    grid-template-row:auto;
    column-gap:25px;
    row-gap:25px;
    margin:25px 0;

    @media(max-width:768px)
    {
        display:flex;
        flex-direction:column;
        padding:0 5px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user : state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => ({

})



export default connect(mapStateToProps, mapDispatchToProps)(Home);

