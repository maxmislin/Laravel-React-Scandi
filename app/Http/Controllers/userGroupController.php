<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addAttributeRequest;
use App\Models\Category;
use App\Models\UserGroup;
use App\Models\UserGroupCategory;
use App\Http\Requests\addUserGroupRequest;

class userGroupController extends Controller
{
    public function submitUserGroup(addUserGroupRequest $req) {
        $addUserGroup = new UserGroup();
        $categories = Category::all();

        $addUserGroup->name_en = $req->input('name_en');
        $addUserGroup->name_ru = $req->input('name_ru');
        $addUserGroup->name_lv = $req->input('name_lv');
        $addUserGroup->save();


        foreach($categories as $category){
          if ($req[$category->name_en] || $req[$category->name_ru] || $req[$category->name_lv]){
            $userGruopCategory = new UserGroupCategory();
            $userGruopCategory->user_group_id = $addUserGroup->id;
            $userGruopCategory->category_id = $category->id;

            $userGruopCategory->save();
          }
          
        }

        $addUserGroup->save();
  }

  public function allUserGroupData() {
    $userGroups = UserGroup::all();
    $userGroupCategories = UserGroupCategory::all();
    $categories = Category::all();

    return response()->json(array('userGroups' => $userGroups, 'userGroupCategories' => $userGroupCategories, 'categories' => $categories));
}
}