const { newEnforcer } = require('casbin');

async function main() {
    const enforcer = await newEnforcer('./basic_model.conf', './basic_policy.csv');
    enforcer.addFunction('cuong', (...key) => {
        return key[1].split('-').includes(key[0]);
    });
    const roles = await enforcer.getRolesForUser('alice');
    console.log(roles);
    const sub = 'bob'; // the user that wants to access a resource.
    const obj = '5'; // the resource that is going to be accessed.
    const act = 'read'; // the operation that the user performs on the resource.

    const res = await enforcer.enforce(sub, obj, act);
    console.log(res);

}

main()