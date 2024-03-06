import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {history} from "./utils/history";
import LoginView from "./view/LoginView";
import SignUpView from "./view/SignUpVIew";
import UserHomeView from "./view/User/HomeView";
import ProblemDetails from "./view/User/ProblemDetails";
import SubmitCode from "./view/User/SubmitCode";
import ProblemAdmin from "./view/Admin/ProblemAdmin";
import UserAdmin from "./view/Admin/UserAdmin";
import ProblemBank from "./view/User/ProblemBank";
import Forum from "./view/User/Forum";
import RankingListView from "./view/User/RankingListView";
import PostEditor from "./view/User/PostEditor";
import ForumDetails from "./view/User/ForumDetails";
import PersonalInfo from "./view/User/PersonalInfo";


class MyRouter extends React.Component {


    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Routes>
                    <Route path="/" element={<UserHomeView/>}/>
                    <Route path="/problemDetails/:problemId" element={<ProblemDetails/>}/>
                    <Route path="/login" element={<LoginView/>}/>
                    <Route path="/signup" element={<SignUpView/>}/>
                    <Route path="/submitCode" element={<SubmitCode/>}/>
                    <Route path="/problemBank" element={<ProblemBank/>}/>
                    <Route path="/forum" element={<Forum/>}/>
                    <Route path="/leaderBoard" element={<RankingListView/>}/>
                    <Route path="/postEditor" element={<PostEditor/>}/>
                    <Route path="/forumInfo" element={<ForumDetails/>}/>
                    <Route path="/admin" element={<UserAdmin/>}></Route>
                    <Route path="/personalInfo" element={<PersonalInfo/>}></Route>


                    <Route path="/admin1" element={<ProblemAdmin/>}></Route>
                    {/* <Route path="/BookInfo/:id" element={<BookInfo />} />
        <Route path="/AdminBookInfo/:id" element={<AdminBookInfo />} />
        <Route path="/AdminDelBooks" element={<AdminDelBook />} />
        <Route path="/AdminUserList" element={<AdminUserList />} />
        <Route path="/AdminStatistics" element={<AdminStatistics />} />
        <Route path="/AdminOrder" element={<AdminOrder />} />
        <Route path="/UserStatistics" element={<UserStatistics />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/*" element={<Navigate to="/Homepage" />} /> */}

                </Routes>
            </Router>
        );
    };
}

export default MyRouter;