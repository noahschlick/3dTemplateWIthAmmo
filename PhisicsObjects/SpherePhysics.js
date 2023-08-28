import * as CANNON from 'cannon-es';

export class SpherePhysics {
    constructor(vecShape, vecPos){
        this.vecShape = vecShape;
        this.vecPos = vecPos;
        const spherePhysMat = new CANNON.Material();
        const sphereBody = new CANNON.Body({
            mass: 10,
            shape: new CANNON.Sphere(this.vecShape),
            position: new CANNON.Vec3(this.vecPos.x, this.vecPos.y, this.vecPos.z),
            material: spherePhysMat
        });
        this.spherePhysMat = spherePhysMat;
        this.sphereBody = sphereBody;
    }

    getBody() {
        return this.sphereBody;
    }

    getPosition() {
        return this.sphereBody.position;
    }

    getQuaternion() {
        return this.sphereBody.quaternion;
    }

    getPhysMat() {
        return this.spherePhysMat;
    }

    setVelocity(x, y, z) {
        this.sphereBody.angularVelocity(x, y, z)
    }

    setLinearDamping(damping) {
        this.sphereBody.linearDamping = damping
    }
}